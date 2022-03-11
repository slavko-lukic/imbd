import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {WithSpringConfig} from 'react-native-reanimated';
import {IMAGE_BASE_URL} from '../constants/api';
import {Movie} from '../models/Movie';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import moment from 'moment';
import {cardShadowStyle} from '../constants/styling';
import SpringInView from './SpringInView';
import {
  ACTIVE_OPACITY_STRONG,
  ACTIVE_OPACITY_WEAK,
} from '../constants/miscellaneous';

interface MovieCardProps {
  movie: Movie;
  index: number;
  onPress?: () => void;
}

const MovieCard: FC<MovieCardProps> = ({movie, index, onPress}) => {
  const cardOffsetY = -((index + 1) * 1200);

  const springAnimationConfig: WithSpringConfig = {
    damping: 18,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  };

  const {
    colorTheme,
    surfaceVariantStyle,
    primaryColorForegroundStyle,
    foregroundStyle,
    accentVariantColorForegroundStyle,
    foregroundVariantStyle,
  } = useColorTheme();

  return (
    <SpringInView
      onPress={onPress}
      activeOpacity={
        colorTheme.type === 'dark' ? ACTIVE_OPACITY_WEAK : ACTIVE_OPACITY_STRONG
      }
      offsetY={cardOffsetY}
      springAnimationConfig={springAnimationConfig}
      style={[styles.card, cardShadowStyle, surfaceVariantStyle]}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode={'cover'}
          source={{
            uri: IMAGE_BASE_URL + movie.poster_path,
          }}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.mainDataContainer}>
          <Text
            numberOfLines={1}
            style={[{fontSize: 18}, primaryColorForegroundStyle]}>
            {movie.original_title}
          </Text>

          <Text style={[{marginTop: 5}, foregroundStyle]} numberOfLines={9}>
            {movie.overview}
          </Text>
        </View>
        <View style={styles.miscDataContainer}>
          <Text style={accentVariantColorForegroundStyle}>
            {moment(movie.release_date).year()}
          </Text>
          <View style={styles.timeContainer}>
            <Ionicons size={15} color={colorTheme.accentVariant} name="time" />
            <Text
              style={[{fontSize: 14, marginLeft: 3}, foregroundVariantStyle]}>
              1h 53m
            </Text>
          </View>
        </View>
      </View>
    </SpringInView>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    height: 230,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 15,

    flexDirection: 'row',
  },
  imageContainer: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: 120,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 15,
    marginRight: 5,
    justifyContent: 'space-between',
  },
  mainDataContainer: {},
  miscDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'flex-end',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
