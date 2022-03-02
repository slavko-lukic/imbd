import React, {FC, useEffect} from 'react';
import {Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import colors from '../constants/colors';

const SettingsGroupTitle: FC = ({children}) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(700, withTiming(1, {duration: 500}));
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {opacity: opacity.value};
  }, []);

  return (
    <Animated.View style={animatedStyle}>
      <Text
        numberOfLines={1}
        style={{
          color: colors.WHITE,
          fontSize: 22,
          marginHorizontal: 10,
          marginBottom: 10,
        }}>
        {children}
      </Text>
    </Animated.View>
  );
};

export default SettingsGroupTitle;
