import React, {FC, useEffect} from 'react';
import {Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {RootState} from '../store/storeConfig';

const SettingsGroupTitle: FC = ({children}) => {
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme,
  );

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
        style={{
          color: colorTheme.onSurface,
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
