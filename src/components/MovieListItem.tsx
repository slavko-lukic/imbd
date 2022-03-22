import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {WithSpringConfig} from 'react-native-reanimated';
import {IMAGE_BASE_URL} from '../constants/api';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import moment from 'moment';
import {cardShadowStyle} from '../constants/styling';
import SpringInView from './SpringInView';
import {
  ACTIVE_OPACITY_STRONG,
  ACTIVE_OPACITY_WEAK,
} from '../constants/miscellaneous';
import {Movie} from '../models';
import FadeInView from './FadeInView';

interface MovieListItemProps {
  movie: Movie;
  index: number;
  onPress?: () => void;
}

const MovieListItem: FC<MovieListItemProps> = ({movie, index, onPress}) => {
  const {
    colorTheme,
    surfaceVariantStyle,
    primaryColorForegroundStyle,
    foregroundStyle,
    accentVariantColorForegroundStyle,
    foregroundVariantStyle,
  } = useColorTheme();

  return (
    <FadeInView
      onPress={onPress}
      activeOpacity={
        colorTheme.type === 'dark' ? ACTIVE_OPACITY_WEAK : ACTIVE_OPACITY_STRONG
      }
      duration={700}
      delay={100 * (index + 1)}
      offsetX={-500}
      style={[styles.cardContainer, cardShadowStyle, surfaceVariantStyle]}>
      <Image
        style={styles.image}
        resizeMode={'cover'}
        source={{
          uri: IMAGE_BASE_URL + movie.poster_path,
        }}
      />
      <View style={styles.detailsContainer}>
        <View style={styles.titleContainer}>
          <Text
            numberOfLines={1}
            style={[
              {fontSize: 15, flex: 1, marginRight: 5},
              primaryColorForegroundStyle,
            ]}>
            {movie.original_title}
          </Text>
          <Text numberOfLines={1} style={accentVariantColorForegroundStyle}>
            {moment(movie.release_date).year()}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={[{fontSize: 14}, foregroundStyle]} numberOfLines={3}>
            {movie.overview}
          </Text>
        </View>
      </View>
    </FadeInView>
  );
};

export default MovieListItem;

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1,

    marginHorizontal: 20,
    marginTop: 10,
    height: 100,
    borderRadius: 5,
  },
  image: {
    width: 65,
    height: '100%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  detailsContainer: {
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',

    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionContainer: {
    marginTop: 4,
  },
});
