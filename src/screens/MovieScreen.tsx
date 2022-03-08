import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainHeader from '../components/MainHeader';
import ReflectionImage from '../components/ReflectionImage';
import {IMAGE_BASE_URL} from '../constants/api';
import {
  BACKDROP_IMAGE_HEIGHT,
  HEADER_HEIGHT,
  HEADER_ICON_SIZE,
} from '../constants/dimensions';
import {cardOnlyTopShadow} from '../constants/styling';
import {AppRoute} from '../enums/routes';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {RootStackNavigatorParams} from '../navigation/RootStackNavigator';

type MovieScreenProps = StackScreenProps<
  RootStackNavigatorParams,
  AppRoute.MOVIE
>;

const MovieScreen: FC<MovieScreenProps> = ({route, navigation}) => {
  const movie = route.params;

  const {
    foregroundStyle,
    colorTheme,
    surfaceStyle,
    primaryColorForegroundStyle,
  } = useColorTheme();

  const goBack = () => {
    navigation.goBack();
  };

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [-100, 0], [1.1, 1], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    return {
      transform: [{scale: scale}],
    };
  });

  const headerLeftButton: JSX.Element = (
    <Ionicons
      name="arrow-back-sharp"
      color={colorTheme.foreground}
      size={HEADER_ICON_SIZE}
      onPress={goBack}
    />
  );

  return (
    <SafeAreaView edges={['top']} style={[styles.screenContaner, surfaceStyle]}>
      <MainHeader leftButton={headerLeftButton} />

      <Animated.View style={[styles.imageContainer, animatedStyles]}>
        <ReflectionImage
          source={{
            uri: IMAGE_BASE_URL + movie.backdrop_path,
          }}
        />
      </Animated.View>

      <Animated.ScrollView
        scrollEventThrottle={10}
        onScroll={scrollHandler}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.card, surfaceStyle, cardOnlyTopShadow]}>
          <View style={styles.titleContainer}>
            <Text style={[{fontSize: 32}, primaryColorForegroundStyle]}>
              {movie.original_title}
            </Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={[{fontSize: 18}, foregroundStyle]}>
              {movie.overview}
              {movie.overview}
              {movie.overview}
              {movie.overview}
              {movie.overview}
            </Text>
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  screenContaner: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    height: BACKDROP_IMAGE_HEIGHT,
    width: '100%',
    position: 'absolute',
    top: HEADER_HEIGHT + getStatusBarHeight(),
    left: 0,
  },
  card: {
    minHeight: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,

    marginTop: BACKDROP_IMAGE_HEIGHT - 25,
  },
  titleContainer: {
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
  },
  genresContainer: {},
  descriptionContainer: {
    marginTop: 20,
    paddingBottom: 10,
  },
});
