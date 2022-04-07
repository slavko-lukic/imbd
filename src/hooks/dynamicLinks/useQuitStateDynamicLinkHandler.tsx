import {useEffect} from 'react';
import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links';

/**
 *
 * @param dynamicLinkHandler - Callback that is executed when app is opened from quit state
 * with dynamic link as parameter. If app was opened through dynamic link, parameter will contain
 * dynamic link data. If app was opened normally, parameter will be null.
 */
export const useQuitStateDynamicLinkHandler = (
  dynamicLinkHandler: (
    link: FirebaseDynamicLinksTypes.DynamicLink | null,
  ) => void,
) => {
  useEffect(() => {
    dynamicLinks().getInitialLink().then(dynamicLinkHandler);
  }, []);
};
