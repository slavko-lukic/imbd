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
import colors from '../constants/colors';

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
        backgroundColor: colors.SURFACE,
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
            color={focused ? colors.PRIMARY : colors.GREY}
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
            color={focused ? colors.PRIMARY : colors.GREY}
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
