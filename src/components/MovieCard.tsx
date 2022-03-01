import React, {FC, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  WithSpringConfig,
} from 'react-native-reanimated';
import {IMAGE_BASE_URL} from '../constants/api';
import colors from '../constants/colors';
import {Movie} from '../models/movie';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface MovieCardProps {
  movie: Movie;
  index: number;
}

const MovieCard: FC<MovieCardProps> = ({movie, index}) => {
  const movieCardX = useSharedValue(1200);

  const springAnimationConfig: WithSpringConfig = {
    damping: 5,
    mass: 0.5,
    stiffness: 30,
    overshootClamping: false,
  };

  const delayedAnimation: number = withSpring(0, springAnimationConfig);

  const movieCardAnimatedStyle = useAnimatedStyle(() => {
    return {transform: [{translateX: movieCardX.value}]};
  }, []);

  useEffect(() => {
    movieCardX.value = withDelay(index * 50, delayedAnimation);
  }, []);

  return (
    <Animated.View style={[styles.card, movieCardAnimatedStyle]}>
      <ImageBackground
        style={styles.image}
        resizeMode={'cover'}
        source={{
          uri: IMAGE_BASE_URL + movie.backdrop_path,
        }}>
        <View style={styles.details}>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={{color: 'white', fontSize: 22}}>
              {movie.original_title}
            </Text>
          </View>
          <View style={styles.heartContainer}>
            <Ionicons name="heart-outline" size={24} color={colors.WHITE} />
          </View>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.SURFACE,
    height: 180,
    borderRadius: 5,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginTop: 15,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  details: {
    height: 40,
    backgroundColor: colors.SURFACE_80,
    paddingHorizontal: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  heartContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
