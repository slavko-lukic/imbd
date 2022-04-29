import React, {FC, useEffect} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeader from '../components/MainHeader';
import {AppRoute} from '../enums/routes';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabNavigatorParams} from '../navigation/BottomTabs';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HEADER_ICON_SIZE} from '../constants/dimensions';
import {gyroscope} from 'react-native-sensors';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
type ProfileScreenProps = BottomTabScreenProps<
  BottomTabNavigatorParams,
  AppRoute.PROFILE
>;

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const MAX_TRANSLATE = 40;

const AnimatedImage = Animated.createAnimatedComponent(Image);

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

  const gyroX = useSharedValue(0);
  const gyroY = useSharedValue(0);

  const previousGyroXTranslation = useSharedValue(0);
  const previousGyroYTranslation = useSharedValue(0);

  const derivedTranslateX = useDerivedValue(() => {
    let newX = previousGyroXTranslation.value + gyroY.value * -1;

    if (Math.abs(newX) >= MAX_TRANSLATE) {
      newX = previousGyroXTranslation.value;
    }

    previousGyroXTranslation.value = newX;

    return newX;
  });

  const derivedTranslateY = useDerivedValue(() => {
    let newY = previousGyroYTranslation.value + gyroX.value * -1;

    if (Math.abs(newY) >= MAX_TRANSLATE) {
      newY = previousGyroYTranslation.value;
    }

    previousGyroYTranslation.value = newY;

    return newY;
  });

  useEffect(() => {
    const gyroSub = gyroscope.subscribe(({x, y, z}) => {
      gyroX.value = Math.round(x * 10) / 10;
      gyroY.value = Math.round(y * 10) / 10;
    });

    return () => {
      gyroSub.unsubscribe();
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: derivedTranslateX.value},
        {translateY: derivedTranslateY.value},
        {scale: 1.3},
      ],
    };
  }, []);

  return (
    <SafeAreaView edges={['top']} style={[styles.screenContaner]}>
      <MainHeader rightButtons={headerRightButton} />
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <AnimatedImage
          style={[animatedStyle, styles.image, styles.absolute]}
          resizeMode={'stretch'}
          source={{
            uri: 'https://my.hdimagesandwallpaper.com/wp-content/uploads/2021/09/Joker-iPhone-Wallpaper-4k.jpg',
          }}
        />
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
  image: {
    width: undefined,
    height: '100%',
    aspectRatio: 9 / 16,
  },
  absolute: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
