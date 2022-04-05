import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import {SETTINGS_ITEM_ICON_SIZE} from '../constants/dimensions';
import {
  ACTIVE_OPACITY_STRONG,
  ACTIVE_OPACITY_WEAK,
} from '../constants/miscellaneous';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import FadeInView from './FadeInView';

interface SettingsGroupItemProps {
  settingName: string;
  icon: string;
  index?: number;
  onPress?: () => void;
}

const SettingsGroupItem: FC<SettingsGroupItemProps> = ({
  settingName,
  icon,
  index = 1,
  onPress,
}) => {
  const {colorTheme, surfaceStyle, foregroundStyle} = useColorTheme();

  return (
    <FadeInView
      delay={index * 150}
      duration={600}
      offsetX={100}
      onPress={onPress}
      activeOpacity={
        colorTheme.type === 'dark' ? ACTIVE_OPACITY_WEAK : ACTIVE_OPACITY_STRONG
      }
      style={[styles.container, surfaceStyle]}>
      <Ionicons
        name={icon}
        size={SETTINGS_ITEM_ICON_SIZE}
        color={colorTheme.foreground}
      />
      <Text
        numberOfLines={1}
        style={[
          {
            fontSize: 16,
            marginHorizontal: 10,
          },
          foregroundStyle,
        ]}>
        {settingName}
      </Text>
    </FadeInView>
  );
};

export default SettingsGroupItem;

const styles = StyleSheet.create({
  container: {
    height: 60,

    borderTopWidth: 0.5,
    borderTopColor: colors.GREY_3,

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    paddingHorizontal: 20,
  },
});
