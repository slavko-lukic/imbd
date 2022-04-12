import React, {FC} from 'react';
import {Image, StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {IMAGE_BASE_URL} from '../constants/api';
import {cardShadowStyle} from '../constants/styling';
import {useMovieCollectionItem} from '../hooks/movies/useMovieCollectionItem';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {Movie} from '../models';
import LoadingOverlay from './LoadingOverlay';

interface SimilarMovieCardProps {
  movie: Movie;
}

const SimilarMovieCard: FC<SimilarMovieCardProps> = ({movie}) => {
  const {surfaceVariantStyle} = useColorTheme();

  const {goToMovie, showAlert, loading} = useMovieCollectionItem(movie);

  return (
    <TouchableWithoutFeedback
      onLongPress={showAlert}
      onPress={goToMovie}
      style={[surfaceVariantStyle, styles.container, cardShadowStyle]}>
      <Image
        style={styles.image}
        resizeMode={'cover'}
        source={{
          uri: IMAGE_BASE_URL + movie.poster_path,
        }}
      />
      {loading ? <LoadingOverlay /> : null}
    </TouchableWithoutFeedback>
  );
};

export default SimilarMovieCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginRight: 10,
    borderRadius: 10,
  },
  image: {
    height: 150,
    aspectRatio: 2 / 3,
    borderRadius: 10,
  },
});
