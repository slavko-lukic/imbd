import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import RootStackNavigator from './src/navigation/RootStackNavigator';
import {persistor, store} from './src/store/storeConfig';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={DarkTheme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RootStackNavigator />
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
