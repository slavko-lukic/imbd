import React, {FC, useEffect} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MovieListTypes} from '../enums/movieListTypes';

interface MovieListSelectorButtonProps {
  selectedList: MovieListTypes;
  switchList: () => void;
}

const MovieListSelectorButton: FC<MovieListSelectorButtonProps> = ({
  selectedList,
  switchList,
}) => {
  const positionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {transform: [{translateX: positionX.value}]};
  }, []);

  const onPressHandler = () => {
    positionX.value = withTiming(-200, {duration: 140}, isFinished => {
      if (isFinished) runOnJS(switchList)();
    });
  };

  useEffect(() => {
    positionX.value = withDelay(500, withTiming(0, {duration: 140}));
  }, [selectedList]);

  return (
    <Animated.View style={[animatedStyle]}>
      <Pressable onPress={onPressHandler} style={styles.button}>
        <Text style={{color: colors.BACKGROUND, fontSize: 14}}>
          {selectedList}
        </Text>
        <Ionicons size={16} color={colors.BACKGROUND} name="caret-back-sharp" />
      </Pressable>
    </Animated.View>
  );
};

export default MovieListSelectorButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.LIGHT_GREY,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});
