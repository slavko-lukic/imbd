import React, {FC, memo, useCallback, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {WithSpringConfig} from 'react-native-reanimated';
import {IMAGE_BASE_URL} from '../constants/api';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import moment from 'moment';
import {cardShadowStyle} from '../constants/styling';
import SpringInView from './SpringInView';
import {
  ACTIVE_OPACITY_STRONG,
  ACTIVE_OPACITY_WEAK,
} from '../constants/miscellaneous';
import {Crew, DetailedMovie, Movie} from '../models';
import {AppRoute} from '../enums/routes';
import {axiosGet} from '../utilities/api';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackNavigatorParams} from '../navigation/RootStackNavigator';
import LoadingOverlay from './LoadingOverlay';

type MovieScreenProp = StackNavigationProp<
  RootStackNavigatorParams,
  AppRoute.MOVIE
>;
interface MovieCardProps {
  movie: Movie;
}

const MovieCard: FC<MovieCardProps> = ({movie}) => {
  const springAnimationConfig: WithSpringConfig = {
    damping: 18,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  };

  const {
    colorTheme,
    surfaceVariantStyle,
    primaryColorForegroundStyle,
    foregroundStyle,
    accentVariantColorForegroundStyle,
  } = useColorTheme();

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<MovieScreenProp>();

  const goToMovie = useCallback(async () => {
    setLoading(true);
    const params = {
      api_key: 'e0966f5c25707b5d4f4f5a1670429967',
      language: 'en-US',
    };

    const creditsResponse = await axiosGet(
      `/movie/${movie.id}/credits`,
      params,
    );
    const detailsResponse = await axiosGet(`/movie/${movie.id}`, params);

    const movieCrew: Crew[] = creditsResponse.data.crew;

    const directorsIndex = movieCrew.findIndex(cast => cast.job === 'Director');
    movieCrew.unshift(...movieCrew.splice(directorsIndex, 1));

    const detailedMovie: DetailedMovie = {
      ...movie,
      backdrop_path: detailsResponse.data.backdrop_path,
      runtime: detailsResponse.data.runtime,
      genres: detailsResponse.data.genres,
      cast: creditsResponse.data.cast,
      crew: movieCrew,
    };

    navigation.navigate(AppRoute.MOVIE, detailedMovie);
    setLoading(false);
  }, [movie]);

  return (
    <SpringInView
      onPress={() => goToMovie()}
      activeOpacity={
        colorTheme.type === 'dark' ? ACTIVE_OPACITY_WEAK : ACTIVE_OPACITY_STRONG
      }
      offsetX={-800}
      springAnimationConfig={springAnimationConfig}
      style={[styles.card, cardShadowStyle, surfaceVariantStyle]}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode={'cover'}
          source={{
            uri: IMAGE_BASE_URL + movie.poster_path,
          }}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.mainDataContainer}>
          <Text
            numberOfLines={1}
            style={[{fontSize: 18}, primaryColorForegroundStyle]}>
            {movie.title}
          </Text>

          <Text style={[{marginTop: 5}, foregroundStyle]} numberOfLines={9}>
            {movie.overview}
          </Text>
        </View>
        <View style={styles.miscDataContainer}>
          <Text style={accentVariantColorForegroundStyle}>
            {moment(movie.release_date).year()}
          </Text>
        </View>
      </View>
      {loading ? <LoadingOverlay /> : null}
    </SpringInView>
  );
};

export default memo(MovieCard);

const styles = StyleSheet.create({
  card: {
    padding: 10,
    height: 230,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 15,

    flexDirection: 'row',
  },
  imageContainer: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: 120,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 15,
    marginRight: 5,
    justifyContent: 'space-between',
  },
  mainDataContainer: {},
  miscDataContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',

    alignItems: 'flex-end',
  },
});
