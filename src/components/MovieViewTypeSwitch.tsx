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

  const switchViewTypeSequence = () => {
    rotation.value = withTiming(90, {}, isFinished => {
      if (isFinished) {
        runOnJS(switchViewType)();
      }
    });
  };

  const switchViewType = () => {
    switch (currentViewType) {
      case MovieViewTypes.CARDS:
        dispatch(changeViewType(MovieViewTypes.GRID));
        break;
      case MovieViewTypes.GRID:
        dispatch(changeViewType(MovieViewTypes.CARDS));
        break;
      default:
        dispatch(changeViewType(MovieViewTypes.CARDS));
        break;
    }
  };

  useEffect(() => {
    rotation.value = withTiming(0);
  }, [currentViewType]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        // {rotateX: rotation.value + 'deg'},
        // {rotateY: rotation.value + 'deg'},
        {rotateZ: rotation.value + 'deg'},
      ],
    };
  }, []);

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons
        name={currentViewType === MovieViewTypes.CARDS ? 'grid' : 'card'}
        color={colorTheme.foreground}
        size={HEADER_ICON_SIZE}
        onPress={switchViewTypeSequence}
      />
    </Animated.View>
  );
};

export default MovieViewTypeSwitch;
