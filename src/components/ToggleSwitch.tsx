import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  ACTIVE_OPACITY_STRONG,
  ACTIVE_OPACITY_WEAK,
} from '../constants/miscellaneous';
import {useColorTheme} from '../hooks/styles/useColorTheme';

interface ToggleSwitchProps {
  leftOptionText: string;
  rightOptionText: string;
  leftOptionOnPress?: () => void;
  rightOptionOnPress?: () => void;
  currentlyActive: 'left' | 'right' | 'none';
  width?: number;
  height?: number;
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({
  leftOptionText,
  rightOptionText,
  currentlyActive = 'none',
  width,
  height,
}) => {
  const {
    colorTheme,
    foregroundStyle,
    surfaceStyle,
    accentVariantColorBackgroundStyle,
    foregroundContrastVariantStyle,
  } = useColorTheme();

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        activeOpacity={
          colorTheme.type === 'dark'
            ? ACTIVE_OPACITY_WEAK
            : ACTIVE_OPACITY_STRONG
        }
        style={[
          {width: width, height: height},
          styles.leftOption,
          styles.center,
          currentlyActive === 'left'
            ? accentVariantColorBackgroundStyle
            : surfaceStyle,
        ]}>
        <Text
          style={
            currentlyActive === 'left'
              ? foregroundContrastVariantStyle
              : foregroundStyle
          }>
          {leftOptionText}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={
          colorTheme.type === 'dark'
            ? ACTIVE_OPACITY_WEAK
            : ACTIVE_OPACITY_STRONG
        }
        style={[
          {width: width, height: height},
          styles.rightOption,
          styles.center,
          currentlyActive === 'right'
            ? accentVariantColorBackgroundStyle
            : surfaceStyle,
        ]}>
        <Text
          style={
            currentlyActive === 'right'
              ? foregroundContrastVariantStyle
              : foregroundStyle
          }>
          {rightOptionText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ToggleSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 2,

    elevation: 4,
  },
  leftOption: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rightOption: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
