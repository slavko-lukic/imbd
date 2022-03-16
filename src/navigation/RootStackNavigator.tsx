import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {AppRoute} from '../enums/routes';
import {BottomTabs} from './BottomTabs';
import React from 'react';
import SettingsStackNavigator from './SettingsNavigator';
import SearchScreen from '../screens/SearchScreen';
import MovieScreen from '../screens/MovieScreen';
import {DetailedMovie} from '../models/Movie';

export type RootStackNavigatorParams = {
  [AppRoute.HOME]: undefined;
  [AppRoute.SETTINGS]: undefined;
  [AppRoute.SEARCH]: undefined;
  [AppRoute.MOVIE]: DetailedMovie;
};

const RootStack = createStackNavigator<RootStackNavigatorParams>();

const screenFadeTransitionInterpolator = ({current}: {current: any}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

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
      <RootStack.Screen
        name={AppRoute.SEARCH}
        component={SearchScreen}
        options={() => ({
          cardStyleInterpolator: screenFadeTransitionInterpolator,
        })}
      />
      <RootStack.Screen name={AppRoute.MOVIE} component={MovieScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
