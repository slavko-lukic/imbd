import React, {FC, useEffect} from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, {Circle, G} from 'react-native-svg';
import {adjustHexOpacity, calculateGradient} from '../utilities/colors';

interface AppleWatchBreathingProps {
  size?: number;
  numberOfCircles?: number;
  startColor?: string;
  endColor?: string;
  rotation?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedG = Animated.createAnimatedComponent(G);

const AppleWatchBreathing: FC<AppleWatchBreathingProps> = ({
  size = 200,
  numberOfCircles = 6,
  startColor = '#68f7f3',
  endColor = '#07ff9e',
  rotation = 30,
}) => {
  const gradients = calculateGradient(startColor, endColor, numberOfCircles);
  const radius = size / 4;

  const animationProgress = useSharedValue(0);

  useEffect(() => {
    animationProgress.value = withRepeat(
      withSequence(
        withDelay(100, withTiming(1, {duration: 3500})),
        withDelay(100, withTiming(0, {duration: 3500})),
      ),
      -1,
    );
  }, []);

  const animatedRotation = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${animationProgress.value * 90}deg`}],
    };
  });

  const animatedMainCircle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: interpolate(animationProgress.value, [0, 1], [0, radius])},
        {scale: interpolate(animationProgress.value, [0, 1], [0.25, 1])},
      ],
    };
  }, []);

  const animatedShadowCircle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: interpolate(animationProgress.value, [0, 1], [0, radius])},
        {
          scale: interpolate(
            animationProgress.value,
            [0, 1],
            [0.7, 1],
            Extrapolate.CLAMP,
          ),
        },
      ],
      opacity: interpolate(
        animationProgress.value,
        [0.3, 1],
        [0, 0.6],
        Extrapolate.CLAMP,
      ),
    };
  }, []);

  return (
    <Svg
      viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
      width={size}
      height={size}>
      <G rotation={rotation + ''}>
        {Array(numberOfCircles)
          .fill('dummy')
          .map((e, i) => {
            return (
              <AnimatedG
                rotation={((i * 360) / numberOfCircles).toString()}
                style={animatedRotation}>
                <AnimatedCircle
                  style={animatedMainCircle}
                  r={radius}
                  fill={adjustHexOpacity(gradients[i], 0.5)}
                />
                <AnimatedCircle
                  style={animatedShadowCircle}
                  r={radius}
                  fill={adjustHexOpacity(gradients[i], 0.5)}
                />
              </AnimatedG>
            );
          })}
      </G>
    </Svg>
  );
};

export default AppleWatchBreathing;
