import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {AppRoute} from '../enums/routes';
import SettingsScreen from '../screens/SettingsScreen';
import React from 'react';
import ColorThemeScreen from '../screens/settings/ColorThemeScreen';

export type SettingsStackNavigatorParams = {
  [AppRoute.SETTINGS_HOME]: undefined;
  [AppRoute.COLOR_THEME]: undefined;
};

const SettingsStack = createStackNavigator<SettingsStackNavigatorParams>();

const SettingsStackNavigator = () => {
  const navigatorOptions: StackNavigationOptions = {
    headerShown: false,
  };

  return (
    <SettingsStack.Navigator screenOptions={navigatorOptions}>
      <SettingsStack.Screen
        name={AppRoute.SETTINGS_HOME}
        component={SettingsScreen}
      />
      <SettingsStack.Screen
        name={AppRoute.COLOR_THEME}
        component={ColorThemeScreen}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsStackNavigator;
