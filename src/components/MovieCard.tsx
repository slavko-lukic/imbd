import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import colors from '../constants/colors';

const MovieCard = () => {
  return (
    <View style={styles.card}>
      <ImageBackground
        style={styles.image}
        resizeMode={'cover'}
        source={{
          uri: 'https://cdn.hbogo.eu/images/9CA62D3F-DBF7-441F-B7B0-94DB59257015/1280_720.jpg',
        }}>
        <View style={styles.details}>
          <Text style={{color: 'white', fontSize: 24}}>Tenet</Text>
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
    borderRadius: 20,
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
