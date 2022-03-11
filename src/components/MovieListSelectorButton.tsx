import React, {FC, useEffect, useState} from 'react';
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
import {useColorTheme} from '../hooks/styles/useColorTheme';
import Neumorphling from './Neumorphling';

interface MovieListSelectorButtonProps {
  updateListData: (displayedList: MovieListTypes) => void;
}

const MovieListSelectorButton: FC<MovieListSelectorButtonProps> = ({
  updateListData,
}) => {
  const {colorTheme} = useColorTheme();

  const [displayedList, setDisplayedList] = useState<MovieListTypes>(
    MovieListTypes.SUGGESTIONS,
  );

  const positionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {transform: [{translateX: positionX.value}]};
  }, []);

  const showNextList = () => {
    switch (displayedList) {
      case MovieListTypes.WATCHED:
        setDisplayedList(MovieListTypes.WATCHLIST);
        break;
      case MovieListTypes.WATCHLIST:
        setDisplayedList(MovieListTypes.SUGGESTIONS);
        break;
      case MovieListTypes.SUGGESTIONS:
        setDisplayedList(MovieListTypes.WATCHED);
        break;
      default:
        setDisplayedList(MovieListTypes.SUGGESTIONS);
        break;
    }
  };

  const onPressHandler = () => {
    positionX.value = withTiming(-200, {duration: 240}, isFinished => {
      if (isFinished) {
        runOnJS(showNextList)();
      }
    });
  };

  useEffect(() => {
    updateListData(displayedList);
    positionX.value = withDelay(100, withTiming(0, {duration: 240}));
  }, [displayedList]);

  return (
    <Animated.View style={[animatedStyle]}>
      <Neumorphling
        backgroundColor={colorTheme.surface}
        distance={7}
        onPress={onPressHandler}
        style={[styles.button]}>
        <Text style={{color: colorTheme.foreground, fontSize: 14}}>
          {displayedList}
        </Text>
        <Ionicons
          size={16}
          color={colorTheme.foreground}
          name="caret-back-sharp"
        />
      </Neumorphling>
    </Animated.View>
  );
};

export default MovieListSelectorButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});
