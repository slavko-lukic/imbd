import {useEffect} from 'react';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export const useDelayedFadeIn = (delay: number) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, {duration: 500}));
  }, []);

  const delayedFadeInAnimatedStyle: ViewStyle | ImageStyle | TextStyle =
    useAnimatedStyle(() => {
      return {opacity: opacity.value};
    }, []);

  return delayedFadeInAnimatedStyle;
};
