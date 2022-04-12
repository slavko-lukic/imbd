import React, {FC, memo, useCallback, useState} from 'react';
import {
  Alert,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {IMAGE_BASE_URL} from '../constants/api';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {
  ACTIVE_OPACITY_STRONG,
  ACTIVE_OPACITY_WEAK,
} from '../constants/miscellaneous';
import {Movie} from '../models';
import FadeInView from './FadeInView';
import colors from '../constants/colors';
import {randomIntFromInterval} from '../utilities/misc';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackNavigatorParams} from '../navigation/RootStackNavigator';
import {AppRoute} from '../enums/routes';
import {useNavigation} from '@react-navigation/native';
import LoadingOverlay from './LoadingOverlay';
import {composeDetailedMovie} from '../utilities/movies';

type RootScreenProp = StackNavigationProp<
  RootStackNavigatorParams,
  AppRoute.MOVIE
>;

interface MovieGridItemProps {
  movie: Movie;
}

const MovieGridItem: FC<MovieGridItemProps> = ({movie}) => {
  const {colorTheme, surfaceVariantStyle} = useColorTheme();

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

    navigation.push(AppRoute.MOVIE, detailedMovie);
    setLoading(false);
  }, [movie]);

  return (
    <FadeInView
      onPress={() => goToMovie()}
      activeOpacity={
        colorTheme.type === 'dark' ? ACTIVE_OPACITY_WEAK : ACTIVE_OPACITY_STRONG
      }
      offsetY={-100 - randomIntFromInterval(0, 300)}
      duration={150 * randomIntFromInterval(3, 7)}
      style={[surfaceVariantStyle]}>
      <ImageBackground
        style={styles.image}
        resizeMode={'cover'}
        source={{
          uri: IMAGE_BASE_URL + movie.poster_path,
        }}>
        <View style={styles.titleBackground}>
          <Text
            numberOfLines={1}
            style={[{fontSize: 16, color: colors.WHITE_DIMMED}]}>
            {movie.title}
          </Text>
        </View>
      </ImageBackground>
      {loading ? <LoadingOverlay /> : null}
    </FadeInView>
  );
};

export default memo(MovieGridItem);

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: Dimensions.get('window').width / 3,
    height: undefined,
    aspectRatio: 2 / 3,
    justifyContent: 'flex-end',
  },
  titleBackground: {
    backgroundColor: colors.GREY_1_80,
    height: 26,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
});
