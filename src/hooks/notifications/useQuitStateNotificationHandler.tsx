import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {useEffect} from 'react';

/**
 *
 * @param notificationHandler - Callback that is executed when app is opened from quit state
 * with remote message as parameter. If app was opened through notification, parameter will contain
 * remote message data. If app was opened normally, parameter will be null.
 */
export const useQuitStateNotificationHandler = (
  notificationHandler: (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage | null,
  ) => void,
) => {
  useEffect(() => {
    messaging().getInitialNotification().then(notificationHandler);
  }, []);
};
