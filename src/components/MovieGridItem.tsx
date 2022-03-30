import React, {FC, memo} from 'react';
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
import {randomIntFromInterval} from '../utilities/misc';

interface MovieGridItemProps {
  movie: Movie;
  onPress?: () => void;
}

const MovieGridItem: FC<MovieGridItemProps> = ({movie, onPress}) => {
  const {colorTheme, surfaceVariantStyle} = useColorTheme();

  return (
    <FadeInView
      onPress={onPress}
      activeOpacity={
        colorTheme.type === 'dark' ? ACTIVE_OPACITY_WEAK : ACTIVE_OPACITY_STRONG
      }
      offsetY={-100 - randomIntFromInterval(0, 300)}
      duration={150 * randomIntFromInterval(3, 7)}
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
            {movie.title}
          </Text>
        </View>
      </ImageBackground>
    </FadeInView>
  );
};

export default memo(MovieGridItem);

const styles = StyleSheet.create({
  card: {
    height: 200,
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
    paddingHorizontal: 4,
  },
});
