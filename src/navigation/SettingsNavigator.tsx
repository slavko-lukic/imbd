import {createStackNavigator} from '@react-navigation/stack';
import {AppRoute} from '../enums/routes';
import SettingsScreen from '../screens/SettingsScreen';
import React from 'react';

export type SettingsStackNavigatorParams = {
  [AppRoute.SETTINGS_HOME]: undefined;
};

const SettingsStack = createStackNavigator<SettingsStackNavigatorParams>();

const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name={AppRoute.SETTINGS_HOME}
        component={SettingsScreen}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsStackNavigator;
