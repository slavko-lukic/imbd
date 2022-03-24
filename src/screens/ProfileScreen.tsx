import React, {FC, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeader from '../components/MainHeader';
import {AppRoute} from '../enums/routes';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabNavigatorParams} from '../navigation/BottomTabs';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HEADER_ICON_SIZE} from '../constants/dimensions';
import Svg, {Circle, G} from 'react-native-svg';
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

type ProfileScreenProps = BottomTabScreenProps<
  BottomTabNavigatorParams,
  AppRoute.PROFILE
>;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedG = Animated.createAnimatedComponent(G);

const SIZE = 250;

const ProfileScreen: FC<ProfileScreenProps> = ({navigation}) => {
  const {colorTheme} = useColorTheme();

  const goToSettings = () => {
    navigation.navigate(AppRoute.SETTINGS);
  };

  const headerRightButton: JSX.Element = (
    <Ionicons
      name="settings-sharp"
      color={colorTheme.foreground}
      size={HEADER_ICON_SIZE}
      onPress={goToSettings}
    />
  );

  const a = useSharedValue(0);

  useEffect(() => {
    a.value = withRepeat(
      withSequence(
        withDelay(500, withTiming(1, {duration: 3500})),
        withDelay(3500, withTiming(0, {duration: 7000})),
      ),
      -1,
    );
  }, []);
  const radius = SIZE / 4;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: interpolate(a.value, [0, 1], [0, radius])},
        {scale: interpolate(a.value, [0, 1], [0.25, 1])},
      ],
    };
  }, []);

  const animatedStyle3 = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: interpolate(a.value, [0, 1], [0, radius])},
        {scale: interpolate(a.value, [0, 0.6], [0.25, 1], Extrapolate.CLAMP)},
      ],
      opacity: interpolate(a.value, [0, 1], [0, 0.5], Extrapolate.CLAMP),
    };
  }, []);

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${a.value * 90}deg`}],
    };
  });

  return (
    <SafeAreaView edges={['top']} style={[styles.screenContaner]}>
      <MainHeader rightButtons={headerRightButton} />
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Svg
          viewBox={`${-SIZE / 2} ${-SIZE / 2} ${SIZE} ${SIZE}`}
          width={SIZE}
          height={SIZE}>
          <G rotation="30">
            <AnimatedG rotation="0" style={animatedStyle2}>
              <AnimatedCircle
                style={animatedStyle}
                r={radius}
                fill={'rgba(107,247,246,0.5)'}
              />
              <AnimatedCircle
                style={animatedStyle3}
                r={radius}
                fill={'rgba(107,247,246,0.5)'}
              />
            </AnimatedG>
            <AnimatedG rotation="60" style={animatedStyle2}>
              <AnimatedCircle
                style={animatedStyle}
                r={radius}
                fill={'rgba(91,248,237,0.5)'}
              />
              <AnimatedCircle
                style={animatedStyle3}
                r={radius}
                fill={'rgba(91,248,237,0.5)'}
              />
            </AnimatedG>
            <AnimatedG rotation="120" style={animatedStyle2}>
              <AnimatedCircle
                style={animatedStyle}
                r={radius}
                fill={'rgba(74,250,226,0.5)'}
              />
              <AnimatedCircle
                style={animatedStyle3}
                r={radius}
                fill={'rgba(74,250,226,0.5)'}
              />
            </AnimatedG>
            <AnimatedG rotation="180" style={animatedStyle2}>
              <AnimatedCircle
                style={animatedStyle}
                r={radius}
                fill={'rgba(58,251,213,0.5)'}
              />
              <AnimatedCircle
                style={animatedStyle3}
                r={radius}
                fill={'rgba(58,251,213,0.5)'}
              />
            </AnimatedG>
            <AnimatedG rotation="240" style={animatedStyle2}>
              <AnimatedCircle
                style={animatedStyle}
                r={radius}
                fill={'rgba(41,252,197, 0.5)'}
              />
              <AnimatedCircle
                style={animatedStyle3}
                r={radius}
                fill={'rgba(41,252,197, 0.5)'}
              />
            </AnimatedG>
            <AnimatedG rotation="300" style={animatedStyle2}>
              <AnimatedCircle
                style={animatedStyle}
                r={radius}
                fill={'rgba(33,253,188, 0.5)'}
              />
              <AnimatedCircle
                style={animatedStyle3}
                r={radius}
                fill={'rgba(33,253,188, 0.5)'}
              />
            </AnimatedG>
          </G>
        </Svg>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screenContaner: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.BLACK,
  },
});
