import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {AppRoute} from '../enums/routes';
import SettingsScreen from '../screens/SettingsScreen';
import React from 'react';
import ColorThemeScreen from '../screens/settings/ColorThemeScreen';
import ConfigureMoviesScreen from '../screens/settings/ConfigureMoviesScreen';

export type SettingsStackNavigatorParams = {
  [AppRoute.SETTINGS_HOME]: undefined;
  [AppRoute.COLOR_THEME]: undefined;
  [AppRoute.CONFIGURE_MOVIES]: undefined;
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
      <SettingsStack.Screen
        name={AppRoute.CONFIGURE_MOVIES}
        component={ConfigureMoviesScreen}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsStackNavigator;
