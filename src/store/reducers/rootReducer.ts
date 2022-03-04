import {combineReducers} from 'redux';
import settingsReducer from './settingsReducer';

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  settings: settingsReducer,
});
