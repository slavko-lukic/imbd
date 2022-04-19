import React, {FC, useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {nordicThemeColors} from '../constants/colors';

const logo = require('../assets/images/logo.png');
const AnimatedImage = Animated.createAnimatedComponent(Image);

interface AnimatedLoadingLogoProps {
  /**
   * delayed time after which logo is shown
   * defaults to 0ms
   */
  delay?: number;
}

const AnimatedLoadingLogo: FC<AnimatedLoadingLogoProps> = ({delay = 0}) => {
  const loadingProgress = useSharedValue(-1);
  const bounceProgress = useSharedValue(0);
  const opacityProgress = useSharedValue(0);

  useEffect(() => {
    opacityProgress.value = withDelay(delay, withTiming(1, {duration: 500}));
    loadingProgress.value = withRepeat(
      withSequence(
        withTiming(1, {duration: 70, easing: Easing.bounce}),
        withTiming(-1, {duration: 70, easing: Easing.bounce}),
      ),
      -1,
    );
    bounceProgress.value = withRepeat(
      withSequence(
        withTiming(1, {duration: 600, easing: Easing.bezierFn(0, 0.7, 1, 1)}),
        withTiming(0, {duration: 600, easing: Easing.bezierFn(0.7, 0, 1, 1)}),
      ),
      -1,
    );
  }, []);

  const animatedShiveringImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotateZ: loadingProgress.value * 2 + 'deg'},
        {translateX: loadingProgress.value * 1},
        {rotateX: loadingProgress.value * 15 + 'deg'},
      ],
      opacity: opacityProgress.value,
    };
  }, []);

  const animatedBouncingCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: -bounceProgress.value * 20}],
      opacity: opacityProgress.value,
    };
  }, []);

  return (
    <>
      <Animated.View style={[styles.circle, animatedBouncingCircleStyle]} />
      <AnimatedImage
        style={[styles.image, animatedShiveringImageStyle]}
        resizeMode={'cover'}
        source={logo}
      />
    </>
  );
};

export default AnimatedLoadingLogo;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: 15,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: nordicThemeColors.PRIMARY,
  },
});
