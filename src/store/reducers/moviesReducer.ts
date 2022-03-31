import {MoviesActionsConstants} from '../../constants/actions/moviesActionsConstants';
import {MoviesAction} from '../../types/actions/moviesActions';
import {MoviesReducerState} from '../../types/reducers/moviesReducerState';

const initialState: MoviesReducerState = {
  watchlist: [],
  watched: [],
};

const moviesReducer = (state = initialState, action: MoviesAction) => {
  let updatedWatchlist = [...state.watchlist];
  let updatedWatched = [...state.watched];

  switch (action.type) {
    case MoviesActionsConstants.ADD_TO_WATCHED:
      // remove movie from watchlist first
      updatedWatchlist = updatedWatchlist.filter(movie => {
        return movie.id !== action.movie.id;
      });

      // check if movie already exists in list
      const indexInWatched = updatedWatched.findIndex(
        movie => movie.id === action.movie.id,
      );

      // if movie doesn't exist in list, add it, otherwise, remove it
      if (indexInWatched === -1) {
        updatedWatched.push(action.movie);
      } else {
        updatedWatched.splice(indexInWatched, 1);
      }

      return {
        ...state,
        watched: [...updatedWatched],
        watchlist: [...updatedWatchlist],
      };
    case MoviesActionsConstants.ADD_TO_WATCHLIST:
      // remove movie from watched first
      updatedWatched = updatedWatched.filter(movie => {
        return movie.id !== action.movie.id;
      });

      // check if movie already exists in list
      const indexInWatchlist = updatedWatchlist.findIndex(
        movie => movie.id === action.movie.id,
      );

      // if movie doesn't exist in list, add it, otherwise, remove it
      if (indexInWatchlist === -1) {
        updatedWatchlist.push(action.movie);
      } else {
        updatedWatchlist.splice(indexInWatchlist, 1);
      }

      return {
        ...state,
        watched: [...updatedWatched],
        watchlist: [...updatedWatchlist],
      };
    default:
      return state;
  }
};

export default moviesReducer;
