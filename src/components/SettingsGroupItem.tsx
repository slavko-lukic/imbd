import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import {SETTINGS_ITEM_ICON_SIZE} from '../constants/dimensions';
import {
  ACTIVE_OPACITY_STRONG,
  ACTIVE_OPACITY_WEAK,
} from '../constants/miscellaneous';
import {useDelayedFadeIn} from '../hooks/animations/useDelayedFadeIn';
import {useColorTheme} from '../hooks/styles/useColorTheme';

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

  const delayedFadeInStyle = useDelayedFadeIn(index * 150, 600, 100, 0);

  return (
    <Animated.View style={delayedFadeInStyle}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={
          colorTheme.type === 'dark'
            ? ACTIVE_OPACITY_WEAK
            : ACTIVE_OPACITY_STRONG
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
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SettingsGroupItem;

const styles = StyleSheet.create({
  container: {
    height: 60,

    borderTopWidth: 0.5,
    borderTopColor: colors.GREY_2,

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    paddingHorizontal: 20,
  },
});
