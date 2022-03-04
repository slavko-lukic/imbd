import React, {FC, useEffect} from 'react';
import {Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {useColorTheme} from '../hooks/styles/useColorTheme';

const SettingsGroupTitle: FC = ({children}) => {
  const {foregroundStyle} = useColorTheme();

  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(900, withTiming(1, {duration: 500}));
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {opacity: opacity.value};
  }, []);

  return (
    <Animated.View style={animatedStyle}>
      <Text
        numberOfLines={1}
        style={[
          {
            fontSize: 22,
            marginHorizontal: 10,
            marginBottom: 10,
          },
          foregroundStyle,
        ]}>
        {children}
      </Text>
    </Animated.View>
  );
};

export default SettingsGroupTitle;
