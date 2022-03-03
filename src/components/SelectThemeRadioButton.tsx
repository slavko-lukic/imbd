import React, {FC, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SETTINGS_ITEM_ICON_SIZE} from '../constants/dimensions';
import {ColorThemes} from '../enums/colorThemes';
import {useColorTheme} from '../hooks/useColorTheme';

interface SelectThemeRadioButtonProps {
  colorThemeName: ColorThemes;
  index?: number;
}

const SelectThemeRadioButton: FC<SelectThemeRadioButtonProps> = ({
  colorThemeName,
  index = 1,
}) => {
  const {colorTheme, setColorTheme, colorThemeOnSurfaceStyle} = useColorTheme();

  const opacity = useSharedValue(0);
  const positionY = useSharedValue(-50);

  useEffect(() => {
    opacity.value = withDelay(index * 80, withTiming(1, {duration: 600}));
    positionY.value = withDelay(index * 80, withTiming(0, {duration: 600}));
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {opacity: opacity.value, transform: [{translateY: positionY.value}]};
  }, []);

  return (
    <Animated.View style={[animatedStyle, styles.container]}>
      <TouchableOpacity
        style={styles.touchablePart}
        activeOpacity={0.7}
        onPress={() => {
          setColorTheme(colorThemeName);
        }}>
        <Ionicons
          color={colorTheme.onSurface}
          size={SETTINGS_ITEM_ICON_SIZE}
          name={
            colorTheme.themeName === colorThemeName
              ? 'radio-button-on'
              : 'radio-button-off'
          }
        />
        <Text
          style={[
            {fontSize: 16, marginHorizontal: 10},
            colorThemeOnSurfaceStyle,
          ]}>
          {colorThemeName}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SelectThemeRadioButton;

const styles = StyleSheet.create({
  container: {
    height: 40,

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    paddingHorizontal: 20,
  },
  touchablePart: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
