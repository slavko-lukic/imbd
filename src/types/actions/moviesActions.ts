import {MoviesActionsConstants} from '../../constants/actions/moviesActionsConstants';
import {Movie} from '../../models';

type addToWatchlist = {
  type: MoviesActionsConstants.ADD_TO_WATCHLIST;
  movie: Movie;
};

type addToWatched = {
  type: MoviesActionsConstants.ADD_TO_WATCHED;
  movie: Movie;
};

export type MoviesAction = addToWatchlist | addToWatched;
