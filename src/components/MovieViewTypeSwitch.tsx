import React, {FC, useEffect} from 'react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {HEADER_ICON_SIZE} from '../constants/dimensions';
import {MovieViewTypes} from '../enums/movieViewTypes';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {changeViewType} from '../store/actions/settingsActions';
import {RootState} from '../store/reducers/rootReducer';

interface MovieViewTypeSwitchProps {}

const MovieViewTypeSwitch: FC<MovieViewTypeSwitchProps> = () => {
  const dispatch = useDispatch();
  const currentViewType = useSelector(
    (state: RootState) => state.settings.movieViewType,
  );
  const {colorTheme} = useColorTheme();

  const rotation = useSharedValue(0);

  const startSwitchSequence = () => {
    rotation.value = withTiming(90, {duration: 200}, isFinished => {
      if (isFinished) runOnJS(switchViewType)();
    });
  };

  const switchViewType = () => {
    dispatch(changeViewType(getNextViewType()));
  };

  useEffect(() => {
    rotation.value = withTiming(0);
  }, [currentViewType]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateY: rotation.value + 'deg'}],
    };
  }, []);

  const getNextViewType = () => {
    switch (currentViewType) {
      case MovieViewTypes.CARDS:
        return MovieViewTypes.GRID;
      case MovieViewTypes.GRID:
        return MovieViewTypes.LIST;
      case MovieViewTypes.LIST:
        return MovieViewTypes.CARDS;
      default:
        return MovieViewTypes.CARDS;
    }
  };

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons
        name={getNextViewType()}
        color={colorTheme.foreground}
        size={HEADER_ICON_SIZE}
        onPress={startSwitchSequence}
      />
    </Animated.View>
  );
};

export default MovieViewTypeSwitch;
