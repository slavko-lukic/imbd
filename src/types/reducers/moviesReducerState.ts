import {Movie} from '../../models';

export type MoviesReducerState = {
  watchlist: Movie[];
  watched: Movie[];
};
