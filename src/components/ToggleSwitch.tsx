import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  ACTIVE_OPACITY_STRONG,
  ACTIVE_OPACITY_WEAK,
} from '../constants/miscellaneous';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import Neumorphling from './Neumorphling';

interface ToggleSwitchProps {
  leftOptionText: string;
  rightOptionText: string;
  leftOptionOnPress?: () => void;
  rightOptionOnPress?: () => void;
  currentlyActive?: 'left' | 'right' | 'none';
  width?: number;
  height?: number;
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({
  leftOptionText,
  rightOptionText,
  currentlyActive = 'none',
  width,
  height,
  leftOptionOnPress,
  rightOptionOnPress,
}) => {
  const {colorTheme, foregroundStyle, foregroundContrastVariantStyle} =
    useColorTheme();

  const leftButtonStyle: ViewStyle = {
    width: width,
    height: height,
    backgroundColor:
      currentlyActive === 'left'
        ? colorTheme.accentVariant
        : colorTheme.surface,
  };

  const rightButtonStyle: ViewStyle = {
    width: width,
    height: height,
    backgroundColor:
      currentlyActive === 'right'
        ? colorTheme.accentVariant
        : colorTheme.surface,
  };

  return (
    <Neumorphling
      style={{borderRadius: 10}}
      distance={5}
      backgroundColor={colorTheme.surface}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={leftOptionOnPress}
          activeOpacity={
            colorTheme.type === 'dark'
              ? ACTIVE_OPACITY_WEAK
              : ACTIVE_OPACITY_STRONG
          }
          style={[styles.center, leftButtonStyle]}>
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
          onPress={rightOptionOnPress}
          activeOpacity={
            colorTheme.type === 'dark'
              ? ACTIVE_OPACITY_WEAK
              : ACTIVE_OPACITY_STRONG
          }
          style={[styles.center, rightButtonStyle]}>
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
    </Neumorphling>
  );
};

export default ToggleSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
