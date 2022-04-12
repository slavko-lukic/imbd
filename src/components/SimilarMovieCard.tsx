import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useCallback, useState} from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {IMAGE_BASE_URL} from '../constants/api';
import {cardShadowStyle} from '../constants/styling';
import {AppRoute} from '../enums/routes';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {Movie} from '../models';
import {RootStackNavigatorParams} from '../navigation/RootStackNavigator';
import {composeDetailedMovie} from '../utilities/movies';
import LoadingOverlay from './LoadingOverlay';

type RootScreenProp = StackNavigationProp<
  RootStackNavigatorParams,
  AppRoute.MOVIE
>;

interface SimilarMovieCardProps {
  movie: Movie;
}

const SimilarMovieCard: FC<SimilarMovieCardProps> = ({movie}) => {
  const {surfaceVariantStyle} = useColorTheme();

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<RootScreenProp>();

  const goToMovie = useCallback(async () => {
    setLoading(true);

    const detailedMovie = await composeDetailedMovie(movie.id);

    if (!detailedMovie) {
      setLoading(false);
      Alert.alert(
        'Network Error',
        'Failed to fetch movied details. Check your internet connection.',
      );
      return;
    }
    setLoading(false);
    navigation.push(AppRoute.MOVIE, detailedMovie);
  }, [movie]);

  return (
    <TouchableWithoutFeedback
      onPress={goToMovie}
      style={[surfaceVariantStyle, styles.container, cardShadowStyle]}>
      <Image
        style={styles.image}
        resizeMode={'cover'}
        source={{
          uri: IMAGE_BASE_URL + movie.poster_path,
        }}
      />
      {loading ? <LoadingOverlay /> : null}
    </TouchableWithoutFeedback>
  );
};

export default SimilarMovieCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginRight: 10,
    borderRadius: 10,
  },
  image: {
    height: 150,
    aspectRatio: 2 / 3,

    borderRadius: 10,
  },
});
