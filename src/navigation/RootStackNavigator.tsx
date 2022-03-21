import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionSpecs,
} from '@react-navigation/stack';
import {AppRoute} from '../enums/routes';
import {BottomTabs} from './BottomTabs';
import React from 'react';
import SettingsStackNavigator from './SettingsNavigator';
import SearchScreen from '../screens/SearchScreen';
import MovieScreen from '../screens/MovieScreen';
import {DetailedMovie} from '../models/Movie';
import FullCreditsScreen from '../screens/FullCreditsScreen';
import {Cast, Crew} from '../models';

export type RootStackNavigatorParams = {
  [AppRoute.HOME]: undefined;
  [AppRoute.SETTINGS]: undefined;
  [AppRoute.SEARCH]: undefined;
  [AppRoute.MOVIE]: DetailedMovie;
  [AppRoute.FULL_CREDITS]: {items: Cast[] | Crew[]; groupName: string};
};

const RootStack = createStackNavigator<RootStackNavigatorParams>();

const slideFromBottomModalScreenOptions: StackNavigationOptions = {
  gestureEnabled: true,
  gestureDirection: 'vertical',
  detachPreviousScreen: false,
  cardOverlayEnabled: true,
  cardShadowEnabled: true,
  cardStyle: {
    backgroundColor: 'transparent',
  },
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({current, layouts: {screen}}) => {
    const translateY = current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [screen.height, 0],
      extrapolate: 'clamp',
    });

    const overlayOpacity = current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.3],
      extrapolate: 'clamp',
    });

    return {
      cardStyle: {
        backgroundColor: 'transparent',
        transform: [{translateY}],
      },
      overlayStyle: {
        opacity: overlayOpacity,
      },
    };
  },
};

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
      <RootStack.Screen
        name={AppRoute.FULL_CREDITS}
        component={FullCreditsScreen}
        options={slideFromBottomModalScreenOptions}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
