import {combineReducers} from 'redux';
import moviesReducer from './moviesReducer';
import settingsReducer from './settingsReducer';

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  settings: settingsReducer,
  movies: moviesReducer,
});
