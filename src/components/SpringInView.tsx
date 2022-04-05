import React, {FC, useEffect} from 'react';
import {TouchableOpacity, View, ViewProps} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  WithSpringConfig,
} from 'react-native-reanimated';

interface SpringInViewProps extends ViewProps {
  /**
   * Delays the animation by set time (in milliseconds).
   * Defaults to 0.
   */
  delay?: number;

  /**
   * Spring animation configuration.
   */
  springAnimationConfig?: WithSpringConfig;

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

const SpringInView: FC<SpringInViewProps> = ({
  delay = 0,
  springAnimationConfig,
  offsetX = 0,
  offsetY = 0,
  onPress,
  activeOpacity,
  children,
  style,
  ...otherProps
}) => {
  const positionX = useSharedValue(offsetX);
  const positionY = useSharedValue(offsetY);

  const springAnimation: number = withSpring(0, springAnimationConfig);

  useEffect(() => {
    if (offsetX) positionX.value = withDelay(delay, springAnimation);
    if (offsetY) positionY.value = withDelay(delay, springAnimation);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
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

export default SpringInView;
