import {CommonActions} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC, useEffect, useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppRoute} from '../enums/routes';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {RootStackNavigatorParams} from '../navigation/RootStackNavigator';
import messaging from '@react-native-firebase/messaging';
import {FcmRequestUserPermission} from '../utilities/notifications';
import AnimatedLoadingLogo from '../components/AnimatedLoadingLogo';
import {useQuitStateNotificationHandler} from '../hooks/notifications/useQuitStateNotificationHandler';
import {composeDetailedMovie} from '../utilities/movies';
import {useMinimumTimePassed} from '../hooks/misc/useMinimumTimePassed';
import {useQuitStateDynamicLinkHandler} from '../hooks/dynamicLinks/useQuitStateDynamicLinkHandler';

type LoadingScreenProps = StackScreenProps<
  RootStackNavigatorParams,
  AppRoute.LOADING
>;

const LoadingScreen: FC<LoadingScreenProps> = ({navigation}) => {
  const {colorTheme, backgroundStyle} = useColorTheme();
  const minimumTimePassed = useMinimumTimePassed(3500);

  const [fcmAuthStatus, setFcmAuthStatus] = useState(
    messaging.AuthorizationStatus.NOT_DETERMINED,
  );
  const [routes, setRoutes] = useState<any[]>([]);

  const [notificationsHandled, setNotificationsHandled] = useState(false);
  const [dynamicLinkHandled, setDynamicLinkHandled] = useState(false);

  const updateRoutes = async (movieId: number) => {
    const detailedMovie = await composeDetailedMovie(movieId);

    if (detailedMovie)
      setRoutes(prev => [
        ...prev,
        {name: AppRoute.MOVIE, params: detailedMovie},
      ]);
  };

  useQuitStateNotificationHandler(remoteMessage => {
    if (!remoteMessage || !remoteMessage.data) {
      // app was not opened through notification
      setNotificationsHandled(true);
      return;
    }

    // app was opened through notification
    updateRoutes(parseInt(remoteMessage.data.id)).then(() => {
      setNotificationsHandled(true);
    });
  });

  useQuitStateDynamicLinkHandler(dynamicLink => {
    if (!dynamicLink || !dynamicLink.url) {
      // app was not opened through dynamic link
      setDynamicLinkHandled(true);
      return;
    }

    // app was opened through dynamic link
    updateRoutes(
      parseInt(dynamicLink?.url.split('/').slice(-1)[0].split('-')[0]),
    ).then(() => {
      setDynamicLinkHandled(true);
    });
  });

  // request user permission for notifications
  useEffect(() => {
    FcmRequestUserPermission().then(status => {
      if (status != undefined) setFcmAuthStatus(status);
    });
  }, []);

  // when conditions are met, navigate to next screen
  useEffect(() => {
    // guard -> don't navigate to app until notifications and dynamic links are handled
    // or if user didn't finish setting up notification preferences
    if (
      !minimumTimePassed ||
      !notificationsHandled ||
      !dynamicLinkHandled ||
      fcmAuthStatus === messaging.AuthorizationStatus.NOT_DETERMINED
    )
      return;

    messaging()
      .getToken()
      .then(token => {
        console.log(token);
      });

    navigation.dispatch(
      CommonActions.reset({
        routes: [{name: AppRoute.HOME}, ...routes],
      }),
    );
  }, [
    minimumTimePassed,
    fcmAuthStatus,
    dynamicLinkHandled,
    notificationsHandled,
  ]);

  return (
    <SafeAreaView style={[styles.screenContaner, backgroundStyle]}>
      <StatusBar
        barStyle={colorTheme.type === 'dark' ? 'light-content' : 'dark-content'}
      />
      <AnimatedLoadingLogo />
    </SafeAreaView>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  screenContaner: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
