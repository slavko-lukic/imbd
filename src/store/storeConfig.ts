import {combineReducers, createStore} from 'redux';
import settingsReducer from './reducers/settingsReducer';

const rootReducer = combineReducers({
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
