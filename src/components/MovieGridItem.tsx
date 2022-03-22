import React, {FC} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {IMAGE_BASE_URL} from '../constants/api';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {
  ACTIVE_OPACITY_STRONG,
  ACTIVE_OPACITY_WEAK,
} from '../constants/miscellaneous';
import {Movie} from '../models';
import FadeInView from './FadeInView';
import colors from '../constants/colors';

interface MovieGridItemProps {
  movie: Movie;
  index: number;
  onPress?: () => void;
}

const MovieGridItem: FC<MovieGridItemProps> = ({movie, index, onPress}) => {
  const {colorTheme, surfaceVariantStyle, foregroundStyle} = useColorTheme();

  return (
    <FadeInView
      onPress={onPress}
      activeOpacity={
        colorTheme.type === 'dark' ? ACTIVE_OPACITY_WEAK : ACTIVE_OPACITY_STRONG
      }
      offsetY={-100 * (index + 1)}
      duration={150 * (index + 1)}
      style={[styles.card, surfaceVariantStyle]}>
      <ImageBackground
        style={styles.image}
        resizeMode={'cover'}
        source={{
          uri: IMAGE_BASE_URL + movie.poster_path,
        }}>
        <View style={styles.titleBackground}>
          <Text
            numberOfLines={1}
            style={[{fontSize: 16, color: colors.WHITE_DIMMED}]}>
            {movie.original_title}
          </Text>
        </View>
      </ImageBackground>
    </FadeInView>
  );
};

export default MovieGridItem;

const styles = StyleSheet.create({
  card: {
    height: 230,
  },
  image: {
    flex: 1,
    width: Dimensions.get('window').width / 3,
    justifyContent: 'flex-end',
  },
  titleBackground: {
    backgroundColor: colors.GREY_1_80,
    height: 26,
    justifyContent: 'center',
    paddingLeft: 5,
  },
});
