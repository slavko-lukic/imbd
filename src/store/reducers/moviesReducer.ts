import {MoviesActionsConstants} from '../../constants/actions/moviesActionsConstants';
import {MoviesAction} from '../../types/actions/moviesActions';
import {MoviesReducerState} from '../../types/reducers/moviesReducerState';

const initialState: MoviesReducerState = {
  watchlist: [],
  watched: [],
};

const moviesReducer = (state = initialState, action: MoviesAction) => {
  switch (action.type) {
    case MoviesActionsConstants.ADD_TO_WATCHED:
      // remove movie from watchlist first
      const updatedWatchlist = state.watchlist.filter(movie => {
        return movie.id !== action.movie.id;
      });

      const indexInWatched = state.watched.findIndex(
        movie => movie.id === action.movie.id,
      );

      return {
        ...state,
        watched:
          indexInWatched === -1
            ? [...state.watched, action.movie]
            : [...state.watched],
        watchlist: [...updatedWatchlist],
      };
    case MoviesActionsConstants.ADD_TO_WATCHLIST:
      const updatedWatched = state.watched.filter(movie => {
        return movie.id !== action.movie.id;
      });
      const indexInWatchlist = state.watchlist.findIndex(
        movie => movie.id === action.movie.id,
      );

      return {
        ...state,
        watchlist:
          indexInWatchlist === -1
            ? [...state.watchlist, action.movie]
            : [...state.watchlist],
        watched: [...updatedWatched],
      };
    default:
      return state;
  }
};

export default moviesReducer;
