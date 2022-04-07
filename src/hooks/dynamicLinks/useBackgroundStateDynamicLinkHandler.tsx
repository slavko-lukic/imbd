import {useEffect} from 'react';
import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links';

/**
 *
 * @param dynamicLinkHandler - Callback that is executed when listener catches dynamic link event
 * with dynamic link data as parameter.
 */
export const useBackgroundStateDynamicLinkHandler = (
  dynamicLinkHandler: (link: FirebaseDynamicLinksTypes.DynamicLink) => void,
) => {
  useEffect(() => {
    const unsubscribeFirebase = dynamicLinks().onLink(dynamicLinkHandler);
    return () => {
      unsubscribeFirebase();
    };
  }, []);
};
