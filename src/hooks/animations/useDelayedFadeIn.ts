import {useEffect} from 'react';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

/**
 * Fades element in after set delay.
 * If offsetY and/or offsetX are set, than component will animate from
 * those offset positions to 0 while fading in
 *
 * @param delay time before animation starts - defaults to 0
 * @param duration duration of the animations - defaults to 500
 * @param offsetX initial X position - defaults to 0
 * @param offsetY initial Y position - defaults to 0
 * @returns animated style
 */
export const useDelayedFadeIn = (
  delay = 0,
  duration = 500,
  offsetX = 0,
  offsetY = 0,
) => {
  const opacity = useSharedValue(0);
  const positionX = useSharedValue(offsetX);
  const positionY = useSharedValue(offsetY);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, {duration: duration}));

    if (offsetX)
      positionX.value = withDelay(delay, withTiming(0, {duration: duration}));

    if (offsetY)
      positionY.value = withDelay(delay, withTiming(0, {duration: duration}));
  }, []);

  const delayedFadeInAnimatedStyle: ViewStyle | ImageStyle | TextStyle =
    useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
        transform: [
          {translateY: positionY.value},
          {translateX: positionX.value},
        ],
      };
    }, []);

  return delayedFadeInAnimatedStyle;
};
