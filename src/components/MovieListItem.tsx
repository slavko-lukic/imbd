import React, {FC, memo, useCallback, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IMAGE_BASE_URL} from '../constants/api';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import moment from 'moment';
import {cardShadowStyle} from '../constants/styling';
import {
  ACTIVE_OPACITY_STRONG,
  ACTIVE_OPACITY_WEAK,
} from '../constants/miscellaneous';
import {Crew, DetailedMovie, Movie, Video} from '../models';
import FadeInView from './FadeInView';
import {randomIntFromInterval} from '../utilities/misc';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackNavigatorParams} from '../navigation/RootStackNavigator';
import {AppRoute} from '../enums/routes';
import {useNavigation} from '@react-navigation/native';
import {axiosGet} from '../utilities/api';
import LoadingOverlay from './LoadingOverlay';

type MovieScreenProp = StackNavigationProp<
  RootStackNavigatorParams,
  AppRoute.MOVIE
>;
interface MovieListItemProps {
  movie: Movie;
}

const MovieListItem: FC<MovieListItemProps> = ({movie}) => {
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
    };

    const creditsResponse = await axiosGet(
      `/movie/${movie.id}/credits`,
      params,
    );
    const detailsResponse = await axiosGet(`/movie/${movie.id}`, params);

    const movieCrew: Crew[] = creditsResponse.data.crew;

    const directorsIndex = movieCrew.findIndex(cast => cast.job === 'Director');
    movieCrew.unshift(...movieCrew.splice(directorsIndex, 1));

    const videosResponse = await axiosGet(`/movie/${movie.id}/videos`, params);
    const videos: Video[] = videosResponse.data.results;

    const youtubeTrailer = videos.find(video => {
      return (
        video.site === 'YouTube' &&
        video.type === 'Trailer' &&
        video.official == true
      );
    });

    const detailedMovie: DetailedMovie = {
      ...movie,
      backdrop_path: detailsResponse.data.backdrop_path,
      trailer_id: youtubeTrailer?.key,
      runtime: detailsResponse.data.runtime,
      genres: detailsResponse.data.genres,
      cast: creditsResponse.data.cast,
      crew: movieCrew,
    };

    navigation.navigate(AppRoute.MOVIE, detailedMovie);
    setLoading(false);
  }, [movie]);

  return (
    <FadeInView
      onPress={() => goToMovie()}
      activeOpacity={
        colorTheme.type === 'dark' ? ACTIVE_OPACITY_WEAK : ACTIVE_OPACITY_STRONG
      }
      duration={100 * randomIntFromInterval(5, 10)}
      offsetX={-200 * randomIntFromInterval(3, 6)}
      style={[styles.cardContainer, cardShadowStyle, surfaceVariantStyle]}>
      <Image
        style={styles.image}
        resizeMode={'cover'}
        source={{
          uri: IMAGE_BASE_URL + movie.poster_path,
        }}
      />
      <View style={styles.detailsContainer}>
        <View style={styles.titleContainer}>
          <Text
            numberOfLines={1}
            style={[
              {fontSize: 15, flex: 1, marginRight: 5},
              primaryColorForegroundStyle,
            ]}>
            {movie.title}
          </Text>
          <Text numberOfLines={1} style={accentVariantColorForegroundStyle}>
            {moment(movie.release_date).year()}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={[{fontSize: 14}, foregroundStyle]} numberOfLines={3}>
            {movie.overview}
          </Text>
        </View>
      </View>
      {loading ? <LoadingOverlay /> : null}
    </FadeInView>
  );
};

export default memo(MovieListItem);

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1,

    marginHorizontal: 20,
    marginTop: 10,
    height: 100,
    borderRadius: 5,
  },
  image: {
    width: 65,
    height: '100%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  detailsContainer: {
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',

    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionContainer: {
    marginTop: 4,
  },
});
