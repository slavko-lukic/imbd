import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {useEffect} from 'react';

/**
 *
 * @param notificationHandler - Callback that is executed when listener catches notification event
 * with notification data as parameter.
 */
export const useBackgroundStateNotificationHandler = (
  notificationHandler: (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => void,
) => {
  useEffect(() => {
    messaging().onNotificationOpenedApp(notificationHandler);
  }, []);
};
