import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SETTINGS_ITEM_ICON_SIZE} from '../constants/dimensions';
import {
  ACTIVE_OPACITY_STRONG,
  ACTIVE_OPACITY_WEAK,
} from '../constants/miscellaneous';
import {ColorThemes} from '../enums/colorThemes';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import FadeInView from './FadeInView';

interface RadioButtonProps {
  text: string;
  index?: number;
  isCurrentlyActive?: boolean;
  onPressHandler?: () => void;
}

const RadioButton: FC<RadioButtonProps> = ({
  text,
  index = 1,
  isCurrentlyActive = false,
  onPressHandler,
}) => {
  const {colorTheme, foregroundStyle, primaryColorForegroundStyle} =
    useColorTheme();

  // const onPressHandler = () => {
  //   setColorTheme(colorThemeName);
  // };

  return (
    <FadeInView
      duration={600}
      delay={index * 80}
      offsetY={-50}
      style={styles.container}>
      <TouchableOpacity
        style={styles.touchablePart}
        activeOpacity={
          colorTheme.type === 'dark'
            ? ACTIVE_OPACITY_WEAK
            : ACTIVE_OPACITY_STRONG
        }
        onPress={onPressHandler}>
        <Ionicons
          color={isCurrentlyActive ? colorTheme.primary : colorTheme.foreground}
          size={SETTINGS_ITEM_ICON_SIZE}
          name={isCurrentlyActive ? 'radio-button-on' : 'radio-button-off'}
        />
        <Text
          style={[
            {fontSize: 16, marginHorizontal: 10},
            isCurrentlyActive ? primaryColorForegroundStyle : foregroundStyle,
          ]}>
          {text}
        </Text>
      </TouchableOpacity>
    </FadeInView>
  );
};

export default RadioButton;

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
