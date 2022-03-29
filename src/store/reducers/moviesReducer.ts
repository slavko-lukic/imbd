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
      return {...state, watched: [...state.watched, action.movie]};
    case MoviesActionsConstants.ADD_TO_WATCHLIST:
      return {...state, watchlist: [...state.watchlist, action.movie]};
    default:
      return state;
  }
};

export default moviesReducer;
