import React, {FC} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {Movie} from '../models';
import SimilarMovieCard from './SimilarMovieCard';

interface HorizontalMovieListProps {
  movies: Movie[];
  currentMovieId: number;
}

const HorizontalMovieList: FC<HorizontalMovieListProps> = ({
  movies,
  currentMovieId,
}) => {
  const {surfaceVariantStyle} = useColorTheme();

  const movieCards = movies
    .filter(e => e.id !== currentMovieId)
    .map((movie: Movie) => {
      return <SimilarMovieCard key={movie.id} movie={movie} />;
    });

  const skeletonCards = Array(10)
    .fill('dummy')
    .map((e, i) => {
      return (
        <View key={i} style={[styles.skeletonCard, surfaceVariantStyle]} />
      );
    });

  return (
    <ScrollView
      style={{marginTop: 5, overflow: 'visible'}}
      horizontal
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      {movies.length > 0 && movies ? movieCards : skeletonCards}
    </ScrollView>
  );
};

export default HorizontalMovieList;

const styles = StyleSheet.create({
  list: {},
  skeletonCard: {
    height: 150,
    width: 100,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: 'red',
  },
});
