import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainHeader from '../components/MainHeader';
import {IMAGE_BASE_URL} from '../constants/api';
import {HEADER_HEIGHT, HEADER_ICON_SIZE} from '../constants/dimensions';
import {AppRoute} from '../enums/routes';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {RootStackNavigatorParams} from '../navigation/RootStackNavigator';

type MovieScreenProps = StackScreenProps<
  RootStackNavigatorParams,
  AppRoute.MOVIE
>;

const MovieScreen: FC<MovieScreenProps> = ({route, navigation}) => {
  const movie = route.params;

  const {backgroundStyle, colorTheme} = useColorTheme();

  const goBack = () => {
    navigation.goBack();
  };

  const headerLeftButton: JSX.Element = (
    <Ionicons
      name="arrow-back-sharp"
      color={colorTheme.foreground}
      size={HEADER_ICON_SIZE}
      onPress={goBack}
    />
  );

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.screenContaner, backgroundStyle]}>
      <MainHeader leftButton={headerLeftButton} />
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode={'cover'}
          source={{
            uri: IMAGE_BASE_URL + movie.backdrop_path,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  screenContaner: {
    flex: 1,
    height: '100%',
  },
  imageContainer: {
    height: 220,
    width: '100%',

    position: 'absolute',
    top: HEADER_HEIGHT + getStatusBarHeight(),
    left: 0,
  },
  image: {
    height: '100%',
  },
});
