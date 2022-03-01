import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeader from '../components/MainHeader';
import colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MovieListTypes} from '../enums/movieListTypes';

const MoviesScreen = () => {
  const [currentList, setCurrentList] = useState<
    'watchlist' | 'watched' | 'suggestions'
  >('suggestions');

  // const queryParams = new URLSearchParams({
  //   api_key: 'e0966f5c25707b5d4f4f5a1670429967',
  //   language: 'en-US',
  //   page: '1',
  // });
  // const {response} = useAxiosFetch('/popular', queryParams);
  const X = useSharedValue(0);
  const Y = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {transform: [{translateY: Y.value}, {translateX: X.value}]};
  }, []);

  const listControl = (
    <Animated.View
      style={[{flexDirection: 'row', alignItems: 'center'}, animatedStyle]}>
      <Text style={{color: colors.WHITE, fontSize: 16}}>{currentList}</Text>
      <Ionicons size={16} color={colors.WHITE} name="caret-back-sharp" />
    </Animated.View>
  );

  const nextState = (): MovieListTypes => {
    switch (currentList) {
      case MovieListTypes.WATCHED:
        return MovieListTypes.WATCHLIST;
      case MovieListTypes.WATCHLIST:
        return MovieListTypes.SUGGESTIONS;
      case MovieListTypes.SUGGESTIONS:
        return MovieListTypes.WATCHED;
      default:
        return MovieListTypes.SUGGESTIONS;
    }
  };

  const headerLeftButtonHandler = () => {
    X.value = withTiming(-200, {duration: 140}, isFinished => {
      if (isFinished) {
        Y.value = withTiming(-200, {duration: 140}, isFinished => {
          if (isFinished) runOnJS(setCurrentList)(nextState);
        });
      }
    });
  };

  useEffect(() => {
    X.value = withTiming(-0, {duration: 140}, isFinished => {
      if (isFinished) {
        Y.value = withTiming(0, {duration: 140});
      }
    });
  }, [currentList]);

  return (
    <SafeAreaView
      edges={['top']}
      style={{backgroundColor: colors.BACKGROUND, flex: 1, height: '100%'}}>
      <MainHeader
        leftButton={listControl}
        leftButtonOnPress={headerLeftButtonHandler}
      />
      <Text style={{color: 'white'}}>This is Movies Screen.</Text>
    </SafeAreaView>
  );
};

export default MoviesScreen;
