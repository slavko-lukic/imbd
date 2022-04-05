import {StackActions} from '@react-navigation/native';
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

type LoadingScreenProps = StackScreenProps<
  RootStackNavigatorParams,
  AppRoute.LOADING
>;

const LoadingScreen: FC<LoadingScreenProps> = ({navigation}) => {
  const {colorTheme, backgroundStyle} = useColorTheme();

  const [fcmAuthStatus, setFcmAuthStatus] = useState(
    messaging.AuthorizationStatus.NOT_DETERMINED,
  );
  const [minimumTimePassed, setMinimumTimePassed] = useState(false);

  // request user permission for notifications
  useEffect(() => {
    FcmRequestUserPermission().then(status => {
      if (status != undefined) setFcmAuthStatus(status);
    });
  }, []);

  // set timer to measure minimum user needs to spend on loading
  useEffect(() => {
    let timer = setTimeout(() => setMinimumTimePassed(true), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // when conditions are met, navigate to next screen
  useEffect(() => {
    if (!minimumTimePassed) return;
    if (fcmAuthStatus === messaging.AuthorizationStatus.NOT_DETERMINED) return;

    navigation.dispatch(StackActions.replace(AppRoute.HOME));
  }, [minimumTimePassed, fcmAuthStatus]);

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
