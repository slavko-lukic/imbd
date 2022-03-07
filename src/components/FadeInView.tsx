import React, {FC, useEffect} from 'react';
import {TouchableOpacity, View, ViewProps} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

interface FadeInViewProps extends ViewProps {
  /**
   * Initial opacity of the component.
   * If set to 1 there will be no fade animation.
   * Defaults to 0
   */
  initialOpacity?: number;

  /**
   * Delays the animation by set time (in milliseconds).
   * Defaults to 0.
   */
  delay?: number;

  /**
   * Duration of the animation (in milliseconds).
   * Defaults to 500.
   */
  duration?: number;

  /**
   * Initial X position.
   * Defaults to 0.
   */
  offsetX?: number;

  /**
   * Initial Y position.
   * Defaults to 0.
   */
  offsetY?: number;

  /**
   * Callback that executes when component is pressed.
   */
  onPress?: () => void;

  /**
   * Determines what the opacity of the wrapped view should be when touch is active
   * Defaults to 0.2.
   */
  activeOpacity?: number;
}

const FadeInView: FC<FadeInViewProps> = ({
  initialOpacity = 0,
  delay = 0,
  duration = 500,
  offsetX = 0,
  offsetY = 0,
  onPress,
  activeOpacity,
  children,
  style,
  ...otherProps
}) => {
  const opacity = useSharedValue(initialOpacity);
  const positionX = useSharedValue(offsetX);
  const positionY = useSharedValue(offsetY);

  const timingOpacity: number = withTiming(1, {duration: duration});
  const timingPosition: number = withTiming(0, {duration: duration});

  useEffect(() => {
    if (initialOpacity < 1) opacity.value = withDelay(delay, timingOpacity);

    if (offsetX) positionX.value = withDelay(delay, timingPosition);

    if (offsetY) positionY.value = withDelay(delay, timingPosition);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{translateX: positionX.value}, {translateY: positionY.value}],
    };
  }, []);

  return (
    <Animated.View style={animatedStyle} {...otherProps}>
      {onPress ? (
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={onPress}
          style={style}>
          {children}
        </TouchableOpacity>
      ) : (
        <View style={style}>{children}</View>
      )}
    </Animated.View>
  );
};

export default FadeInView;
