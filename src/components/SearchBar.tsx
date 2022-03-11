import React, {FC, useEffect} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {useColorTheme} from '../hooks/styles/useColorTheme';

interface SearchBarProps {}
const SearchBar: FC<SearchBarProps> = () => {
  const {
    primaryVariantColorForegroundStyle,
    borderForegroundColorStyle,
    colorTheme,
    foregroundStyle,
  } = useColorTheme();

  const searchBarWidthProgress = useSharedValue(0);

  useEffect(() => {
    searchBarWidthProgress.value = withDelay(
      100,
      withTiming(100, {duration: 300}),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {width: `${searchBarWidthProgress.value}%`};
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.textBox,
          animatedStyle,
          primaryVariantColorForegroundStyle,
          borderForegroundColorStyle,
        ]}>
        <TextInput
          placeholder="Search..."
          placeholderTextColor={colorTheme.foregroundVariant}
          style={[styles.inputField, foregroundStyle]}
        />
      </Animated.View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  textBox: {
    borderWidth: 0.5,
    borderRadius: 4,
    height: 42,
  },
  inputField: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});
