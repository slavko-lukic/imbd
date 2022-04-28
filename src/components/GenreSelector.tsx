import React, {FC, useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacityProps, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useQuery} from 'react-query';
import {cardShadowStyle} from '../constants/styling';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {Genre} from '../models';
import {axiosGet} from '../utilities/api';

const fetchGenres = async () => {
  const params = {
    api_key: 'e0966f5c25707b5d4f4f5a1670429967',
  };
  const genres = await axiosGet(`/genre/movie/list`, params);
  return genres.data.genres;
};

interface GenreSelectorProps extends TouchableOpacityProps {
  onGenresChanged: (genreIds: number[]) => void;
}

const GenreSelector: FC<GenreSelectorProps> = ({
  onGenresChanged,
  ...otherProps
}) => {
  const {surfaceVariantStyle, primaryColorForegroundStyle, foregroundStyle} =
    useColorTheme();

  const genres = useQuery<Genre[]>('genres', fetchGenres);

  const [expanded, setExpanded] = useState(false);
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);

  const animationProgress = useSharedValue(0);

  const onGenrePress = (genre: Genre) => {
    isInList(genre)
      ? setSelectedGenreIds(prev => [...prev.filter(e => e !== genre.id)])
      : setSelectedGenreIds(prev => [...prev, genre.id]);
  };

  const onMainButtonPress = () => {
    if (expanded) onGenresChanged(selectedGenreIds);

    setExpanded(prev => !prev);
  };

  const isInList = useCallback(
    (genre: Genre) => {
      return selectedGenreIds.includes(genre.id);
    },
    [selectedGenreIds],
  );

  useEffect(() => {
    if (expanded) animationProgress.value = withTiming(1);
    else animationProgress.value = withTiming(0);
  }, [expanded]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(animationProgress.value, [0, 1], [0, 200]),
    };
  }, []);

  const mappedGenres = genres.data?.map(genre => {
    return (
      <TouchableWithoutFeedback
        key={genre.id}
        onPress={() => onGenrePress(genre)}
        style={[surfaceVariantStyle, styles.genreListItem]}>
        <Text
          style={
            isInList(genre) ? primaryColorForegroundStyle : foregroundStyle
          }>
          {genre.name}
        </Text>
      </TouchableWithoutFeedback>
    );
  });

  return (
    <View {...otherProps}>
      <Animated.ScrollView
        style={[
          animatedStyle,
          surfaceVariantStyle,
          cardShadowStyle,
          styles.scrollView,
        ]}>
        {mappedGenres}
      </Animated.ScrollView>

      <TouchableWithoutFeedback
        onPress={onMainButtonPress}
        style={[styles.button, cardShadowStyle, surfaceVariantStyle]}>
        <Text style={foregroundStyle}>
          {expanded ? 'Done' : 'Filter by genres'}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default GenreSelector;

const styles = StyleSheet.create({
  button: {
    width: 130,
    height: 30,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: 130,
    bottom: 5,
    borderRadius: 8,
  },
  genreListItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
  },
});
