import React, {FC, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from 'react-native-reanimated';
import {IMAGE_BASE_URL} from '../constants/api';
import colors from '../constants/colors';
import {Movie} from '../models/Movie';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface MovieCardProps {
  movie: Movie;
  index: number;
}

const MovieCard: FC<MovieCardProps> = ({movie, index}) => {
  const movieCardY = useSharedValue(-((index + 1) * 1200));

  const springAnimationConfig: WithSpringConfig = {
    damping: 18,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  };

  const springAnimation: number = withSpring(0, springAnimationConfig);

  const movieCardAnimatedStyle = useAnimatedStyle(() => {
    return {transform: [{translateY: movieCardY.value}]};
  }, []);

  useEffect(() => {
    movieCardY.value = springAnimation;
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
    paddingLeft: 5,
  },
});
