import {useEffect} from 'react';
import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links';

export const useQuitStateDynamicLinkHandler = (
  dynamicLinkHandler: (
    link: FirebaseDynamicLinksTypes.DynamicLink | null,
  ) => void,
) => {
  useEffect(() => {
    dynamicLinks().getInitialLink().then(dynamicLinkHandler);
  }, []);
};
