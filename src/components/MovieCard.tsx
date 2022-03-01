import React, {FC} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import colors from '../constants/colors';
import {Movie} from '../models/movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: FC<MovieCardProps> = ({movie}) => {
  return (
    <View style={styles.card}>
      <ImageBackground
        style={styles.image}
        resizeMode={'cover'}
        source={{
          uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
        }}>
        <View style={styles.details}>
          <Text numberOfLines={1} style={{color: 'white', fontSize: 22}}>
            {movie.original_title}
          </Text>
        </View>
      </ImageBackground>
    </View>
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
});
