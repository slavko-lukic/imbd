import {combineReducers, createStore} from 'redux';
import settingsReducer from './reducers/settingsReducer';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  settings: settingsReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 0,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
