import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {useEffect} from 'react';

export const useQuitStateNotificationHandler = (
  notificationHandler: (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage | null,
  ) => void,
) => {
  useEffect(() => {
    messaging().getInitialNotification().then(notificationHandler);
  }, []);
};
