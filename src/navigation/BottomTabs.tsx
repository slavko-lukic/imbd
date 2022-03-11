import React, {useCallback} from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {AppRoute} from '../enums/routes';
import MoviesScreen from '../screens/MoviesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RouteProp} from '@react-navigation/native';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import colors from '../constants/colors';
import {Movie} from '../models/Movie';

export type BottomTabNavigatorParams = {
  [AppRoute.MOVIES]: undefined;
  [AppRoute.PROFILE]: undefined;
  [AppRoute.SETTINGS]: undefined;
  [AppRoute.SEARCH]: undefined;
  [AppRoute.MOVIE]: Movie;
};

const Tabs = createBottomTabNavigator<BottomTabNavigatorParams>();

export const BottomTabs = (): React.ReactElement => {
  const {colorTheme} = useColorTheme();

  const bottomTabGeneralOptions: (props: {
    route: RouteProp<BottomTabNavigatorParams, keyof BottomTabNavigatorParams>;
    navigation: any;
  }) => BottomTabNavigationOptions = useCallback(
    () => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 100,
        backgroundColor: colorTheme.surface,

        shadowColor: colors.BLACK,
        shadowOffset: {
          width: 0,
          height: -3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.0,
        elevation: 6,
      },
    }),
    [colorTheme],
  );

  const bottomTabMoviesOptions: (props: {
    route: RouteProp<BottomTabNavigatorParams, keyof BottomTabNavigatorParams>;
    navigation: any;
  }) => BottomTabNavigationOptions = useCallback(() => {
    return {
      tabBarIcon: ({focused}) => {
        return (
          <Ionicons
            size={30}
            color={focused ? colorTheme.primary : colorTheme.foreground}
            name="film-outline"
          />
        );
      },
    };
  }, [colorTheme]);

  const bottomTabProfileOptions: (props: {
    route: RouteProp<BottomTabNavigatorParams, keyof BottomTabNavigatorParams>;
    navigation: any;
  }) => BottomTabNavigationOptions = useCallback(() => {
    return {
      tabBarIcon: ({focused}) => {
        return (
          <Ionicons
            size={30}
            color={focused ? colorTheme.primary : colorTheme.foreground}
            name="person-outline"
          />
        );
      },
    };
  }, [colorTheme]);

  return (
    <Tabs.Navigator screenOptions={bottomTabGeneralOptions}>
      <Tabs.Screen
        options={bottomTabMoviesOptions}
        name={AppRoute.MOVIES}
        component={MoviesScreen}
      />
      <Tabs.Screen
        options={bottomTabProfileOptions}
        name={AppRoute.PROFILE}
        component={ProfileScreen}
      />
    </Tabs.Navigator>
  );
};
