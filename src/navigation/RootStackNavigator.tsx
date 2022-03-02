import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {AppRoute} from '../enums/routes';
import {BottomTabs} from './BottomTabs';
import React from 'react';
import SettingsStackNavigator from './SettingsNavigator';

export type RootStackNavigatorParams = {
  [AppRoute.HOME]: undefined;
  [AppRoute.SETTINGS]: undefined;
};

const RootStack = createStackNavigator<RootStackNavigatorParams>();

const RootStackNavigator = () => {
  const navigatorOptions: StackNavigationOptions = {
    headerShown: false,
  };

  return (
    <RootStack.Navigator screenOptions={navigatorOptions}>
      <RootStack.Screen name={AppRoute.HOME} component={BottomTabs} />
      <RootStack.Screen
        name={AppRoute.SETTINGS}
        component={SettingsStackNavigator}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
