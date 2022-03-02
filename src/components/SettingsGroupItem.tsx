import React, {FC, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import {SETTINGS_ITEM_ICON_SIZE} from '../constants/dimensions';

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
  const opacity = useSharedValue(0);
  const positionY = useSharedValue(-50);

  useEffect(() => {
    opacity.value = withDelay(index * 50, withTiming(1, {duration: 500}));
    positionY.value = withDelay(index * 50, withTiming(0, {duration: 500}));
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {opacity: opacity.value, transform: [{translateY: positionY.value}]};
  }, []);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Ionicons
        name={icon}
        size={SETTINGS_ITEM_ICON_SIZE}
        color={colors.WHITE}
      />
      <Text
        numberOfLines={1}
        style={{color: colors.WHITE, fontSize: 16, marginHorizontal: 10}}>
        {settingName}
      </Text>
    </Animated.View>
  );
};

export default SettingsGroupItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.SURFACE,
    height: 60,

    borderTopWidth: 0.5,
    borderTopColor: colors.GREY,

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    paddingHorizontal: 20,
  },
});
