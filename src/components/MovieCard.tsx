import React, {FC, memo, useCallback, useState} from 'react';
import {Alert, AlertButton, Image, StyleSheet, Text, View} from 'react-native';
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
import {Movie} from '../models';
import {AppRoute} from '../enums/routes';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackNavigatorParams} from '../navigation/RootStackNavigator';
import LoadingOverlay from './LoadingOverlay';
import {composeDetailedMovie} from '../utilities/movies';
import {addToWatched, addToWatchlist} from '../store/actions/moviesActions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/reducers/rootReducer';

type RootScreenProp = StackNavigationProp<
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

  const dispatch = useDispatch();

  const isInWatched = useSelector((state: RootState) =>
    state.movies.watched.some(e => e.id === movie.id),
  );
  const isInWatchist = useSelector((state: RootState) =>
    state.movies.watchlist.some(e => e.id === movie.id),
  );

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

  const watchlistAlertButton: AlertButton = {
    text: isInWatchist ? 'Remove from watchlist' : 'Add to watchlist',
    onPress: () => dispatch(addToWatchlist(movie)),
  };

  const watchedAlertButton: AlertButton = {
    text: isInWatched ? 'Remove from watched' : 'Add to watched',
    onPress: () => dispatch(addToWatched(movie)),
  };

  const cancelAlertButton: AlertButton = {
    text: 'Cancel',
    style: 'destructive',
  };

  const showAlert = () => {
    Alert.alert(
      `${movie.title} (${moment(movie.release_date).year()})`,
      undefined,
      [watchlistAlertButton, watchedAlertButton, cancelAlertButton],
    );
  };

  return (
    <SpringInView
      onLongPress={showAlert}
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
