import React, {FC, memo, useCallback, useState} from 'react';
import {
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
import {Crew, DetailedMovie, Movie} from '../models';
import FadeInView from './FadeInView';
import colors from '../constants/colors';
import {randomIntFromInterval} from '../utilities/misc';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackNavigatorParams} from '../navigation/RootStackNavigator';
import {AppRoute} from '../enums/routes';
import {axiosGet} from '../utilities/api';
import {useNavigation} from '@react-navigation/native';
import LoadingOverlay from './LoadingOverlay';

type MovieScreenProp = StackNavigationProp<
  RootStackNavigatorParams,
  AppRoute.MOVIE
>;

interface MovieGridItemProps {
  movie: Movie;
}

const MovieGridItem: FC<MovieGridItemProps> = ({movie}) => {
  const {colorTheme, surfaceVariantStyle} = useColorTheme();

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
