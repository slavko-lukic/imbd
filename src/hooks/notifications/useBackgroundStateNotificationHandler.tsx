import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {useEffect} from 'react';

export const useBackgroundStateNotificationHandler = (
  notificationHandler: (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage | null,
  ) => void,
) => {
  useEffect(() => {
    messaging().onNotificationOpenedApp(notificationHandler);
  }, []);
};
