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

export type BottomTabNavigatorParams = {
  [AppRoute.MOVIES]: undefined;
  [AppRoute.PROFILE]: undefined;
};

const Tabs = createBottomTabNavigator<BottomTabNavigatorParams>();

export const BottomTabs = (): React.ReactElement => {
  const bottomTabGeneralOptions: (props: {
    route: RouteProp<BottomTabNavigatorParams, keyof BottomTabNavigatorParams>;
    navigation: any;
  }) => BottomTabNavigationOptions = useCallback(
    () => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 100,
        backgroundColor: 'rgba(34,36,40,1)',
      },
    }),
    [],
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
            color={focused ? 'cyan' : 'grey'}
            name="film-outline"
          />
        );
      },
    };
  }, []);

  const bottomTabProfileOptions: (props: {
    route: RouteProp<BottomTabNavigatorParams, keyof BottomTabNavigatorParams>;
    navigation: any;
  }) => BottomTabNavigationOptions = useCallback(() => {
    return {
      tabBarIcon: ({focused}) => {
        return (
          <Ionicons
            size={30}
            color={focused ? 'cyan' : 'grey'}
            name="person-outline"
          />
        );
      },
    };
  }, []);

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
