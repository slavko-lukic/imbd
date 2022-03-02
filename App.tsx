import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootStackNavigator from './src/navigation/RootStackNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={DarkTheme}>
        <RootStackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
