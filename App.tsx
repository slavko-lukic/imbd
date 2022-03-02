import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import RootStackNavigator from './src/navigation/RootStackNavigator';
import {store} from './src/store/storeConfig';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={DarkTheme}>
        <Provider store={store}>
          <RootStackNavigator />
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
