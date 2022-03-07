import React, {FC, useEffect} from 'react';
import {TouchableOpacity, ViewProps} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  WithSpringConfig,
} from 'react-native-reanimated';

interface SpringInViewProps extends ViewProps {
  /**
   * delays the animation - defaults to 0 (in milliseconds)
   */
  delay?: number;

  /**
   * spring animation config
   */
  springAnimationConfig?: WithSpringConfig;

  /**
   * initial X position - defaults to 0
   */
  offsetX?: number;

  /**
   * initial Y position - defaults to 0
   */
  offsetY?: number;

  /**
   * callback that executes when component is pressed
   */
  onPress?: () => void;
}

const SpringInView: FC<SpringInViewProps> = ({
  delay = 0,
  springAnimationConfig,
  offsetX = 0,
  offsetY = 0,
  onPress,
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
      <TouchableOpacity onPress={onPress} style={style}>
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SpringInView;
