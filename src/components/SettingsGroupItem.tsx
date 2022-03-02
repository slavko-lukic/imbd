import React, {FC, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import colors from '../constants/colors';
import {SETTINGS_ITEM_ICON_SIZE} from '../constants/dimensions';
import {RootState} from '../store/storeConfig';

interface SettingsGroupItemProps {
  settingName: string;
  icon: string;
  index?: number;
}

const SettingsGroupItem: FC<SettingsGroupItemProps> = ({
  settingName,
  icon,
  index = 1,
}) => {
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme,
  );

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
    <Animated.View
      style={[
        styles.container,
        animatedStyle,
        {backgroundColor: colorTheme.surface},
      ]}>
      <Ionicons
        name={icon}
        size={SETTINGS_ITEM_ICON_SIZE}
        color={colorTheme.onSurface}
      />
      <Text
        numberOfLines={1}
        style={{
          color: colorTheme.onSurface,
          fontSize: 16,
          marginHorizontal: 10,
        }}>
        {settingName}
      </Text>
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
