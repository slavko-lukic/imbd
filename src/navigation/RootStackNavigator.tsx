import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
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
  const stackGeneralOptions: StackNavigationOptions = {
    headerShown: false,
    ...TransitionPresets.SlideFromRightIOS,
  };

  return (
    <RootStack.Navigator screenOptions={stackGeneralOptions}>
      <RootStack.Screen name={AppRoute.HOME} component={BottomTabs} />
      <RootStack.Screen
        name={AppRoute.SETTINGS}
        component={SettingsStackNavigator}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
