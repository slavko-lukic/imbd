import React, {useEffect} from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppState} from '../hooks/misc/useAppState';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {randomIntFromInterval} from '../utilities/misc';

const IMAGE_SIZE = 100;
const BORDER_X = Dimensions.get('window').width - IMAGE_SIZE;
const BORDER_Y = Dimensions.get('window').height - IMAGE_SIZE;

const incognito = require('../assets/images/incognito.png');

const AnimatedImage = Animated.createAnimatedComponent(Image);

const SecureScreenOverlay = () => {
  const {backgroundStyle} = useColorTheme();

  const initialOffsetX = randomIntFromInterval(0, BORDER_X);
  const initialOffsetY = randomIntFromInterval(0, BORDER_Y);

  const durationX = randomIntFromInterval(6000, 10001);
  const durationY = randomIntFromInterval(8000, 12001);

  const xStartsRight = durationX % 2 == 0;
  const yStartsDown = durationY % 2 == 0;

  const deltaX = xStartsRight ? BORDER_X - initialOffsetX : initialOffsetX;
  const deltaY = yStartsDown ? BORDER_Y - initialOffsetY : initialOffsetY;

  const initialDurationX = (durationX * deltaX) / BORDER_X;
  const initialDurationY = (durationY * deltaY) / BORDER_Y;

  const appState = useAppState();

  const x = useSharedValue(initialOffsetX);
  const y = useSharedValue(initialOffsetY);

  useEffect(() => {
    x.value = withTiming(
      xStartsRight ? BORDER_X : 0,
      {
        duration: initialDurationX,
        easing: Easing.linear,
      },
      isFinished => {
        if (isFinished)
          x.value = withRepeat(
            withTiming(xStartsRight ? 0 : BORDER_X, {
              duration: durationX,
              easing: Easing.linear,
            }),
            -1,
            true,
          );
      },
    );

    y.value = withTiming(
      yStartsDown ? BORDER_Y : 0,
      {
        duration: initialDurationY,
        easing: Easing.linear,
      },
      isFinished => {
        if (isFinished)
          y.value = withRepeat(
            withTiming(yStartsDown ? 0 : BORDER_Y, {
              duration: durationY,
              easing: Easing.linear,
            }),
            -1,
            true,
          );
      },
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: x.value}, {translateY: y.value}],
    };
  }, []);

  if (appState === 'active') return null;

  return (
    <SafeAreaView
      pointerEvents="none"
      style={[styles.overlay, backgroundStyle]}>
      <AnimatedImage
        style={[styles.image, animatedStyle]}
        resizeMode={'cover'}
        source={incognito}
      />
    </SafeAreaView>
  );
};

export default SecureScreenOverlay;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  image: {
    position: 'absolute',
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    aspectRatio: 1 / 1,
    borderRadius: 15,
  },
});
