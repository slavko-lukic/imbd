import {StackActions} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC, useEffect} from 'react';
import {Alert, Image, StatusBar, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {nordicThemeColors} from '../constants/colors';
import {AppRoute} from '../enums/routes';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {RootStackNavigatorParams} from '../navigation/RootStackNavigator';
import messaging from '@react-native-firebase/messaging';

const logo = require('../assets/images/logo.png');
const AnimatedImage = Animated.createAnimatedComponent(Image);

type LoadingScreenProps = StackScreenProps<
  RootStackNavigatorParams,
  AppRoute.LOADING
>;

const LoadingScreen: FC<LoadingScreenProps> = ({navigation}) => {
  const {colorTheme, backgroundStyle} = useColorTheme();

  const loadingProgress = useSharedValue(-1);
  const bounceProgress = useSharedValue(0);
  const opacityProgress = useSharedValue(0);

  useEffect(() => {
    requestUserPermission();
  }, []);

  const requestUserPermission = async () => {
    let authStatus = 0;
    try {
      authStatus = await messaging().requestPermission();
    } catch (e: any) {
      console.log(e.message);
    }

    Alert.alert('Authorization status:', authStatus.toString());
  };

  useEffect(() => {
    opacityProgress.value = withDelay(400, withTiming(1, {duration: 500}));
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

    let timer = setTimeout(
      () => navigation.dispatch(StackActions.replace(AppRoute.HOME)),
      3000,
    );

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const animatedLogo = useAnimatedStyle(() => {
    return {
      transform: [
        {rotateZ: loadingProgress.value * 2 + 'deg'},
        {translateX: loadingProgress.value * 1},
        {rotateX: loadingProgress.value * 15 + 'deg'},
      ],
      opacity: opacityProgress.value,
    };
  }, []);

  const animatedCircle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: -bounceProgress.value * 20}],
      opacity: opacityProgress.value,
    };
  }, []);

  return (
    <SafeAreaView style={[styles.screenContaner, backgroundStyle]}>
      <StatusBar
        barStyle={colorTheme.type === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Animated.View style={[styles.circle, animatedCircle]} />
      <AnimatedImage
        style={[styles.image, animatedLogo]}
        resizeMode={'cover'}
        source={logo}
      />
    </SafeAreaView>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  screenContaner: {
    flex: 1,
    width: '100%',
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },
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
