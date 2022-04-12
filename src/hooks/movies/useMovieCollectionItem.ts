import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import moment from 'moment';
import {useCallback, useState} from 'react';
import {Alert, AlertButton} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppRoute} from '../../enums/routes';
import {Movie} from '../../models';
import {RootStackNavigatorParams} from '../../navigation/RootStackNavigator';
import {addToWatched, addToWatchlist} from '../../store/actions/moviesActions';
import {RootState} from '../../store/reducers/rootReducer';
import {composeDetailedMovie} from '../../utilities/movies';

type RootScreenProp = StackNavigationProp<
  RootStackNavigatorParams,
  AppRoute.MOVIE
>;

export const useMovieCollectionItem = (movie: Movie) => {
  const navigation = useNavigation<RootScreenProp>();
  const dispatch = useDispatch();

  const isInWatched = useSelector((state: RootState) =>
    state.movies.watched.some(e => e.id === movie.id),
  );
  const isInWatchist = useSelector((state: RootState) =>
    state.movies.watchlist.some(e => e.id === movie.id),
  );

  const [loading, setLoading] = useState(false);

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

  return {goToMovie, showAlert, loading};
};
