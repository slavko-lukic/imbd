import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {useEffect} from 'react';

export const useNotificationHandler = (
  notificationHandler: (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage | null,
  ) => void,
) => {
  useEffect(() => {
    messaging().getInitialNotification().then(notificationHandler);
    messaging().onNotificationOpenedApp(notificationHandler);
  }, []);
};
