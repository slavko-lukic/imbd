import {MoviesActionsConstants} from '../../constants/actions/moviesActionsConstants';
import {Movie} from '../../models';
import {MoviesAction} from '../../types/actions/moviesActions';

export const addToWatchlist = (movie: Movie): MoviesAction => {
  return {
    type: MoviesActionsConstants.ADD_TO_WATCHLIST,
    movie: movie,
  };
};

export const addToWatched = (movie: Movie): MoviesAction => {
  return {
    type: MoviesActionsConstants.ADD_TO_WATCHED,
    movie: movie,
  };
};
