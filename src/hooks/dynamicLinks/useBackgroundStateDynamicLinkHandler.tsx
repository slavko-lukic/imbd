import {useEffect} from 'react';
import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links';

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
