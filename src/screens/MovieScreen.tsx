import {StackScreenProps} from '@react-navigation/stack';
import moment from 'moment';
import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GenresGroup from '../components/GenresGroup';
import HorizontalSeparator from '../components/HorizontalSeparator';
import MainHeader from '../components/MainHeader';
import MovieDurationLabel from '../components/MovieDurationLabel';
import ReflectionImage from '../components/ReflectionImage';
import ToggleSwitch from '../components/ToggleSwitch';
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
import BouncyHeartSwitch from '../components/BouncyHeartSwitch';
import CreditGroup from '../components/CreditGroup';
import {useDispatch, useSelector} from 'react-redux';
import {addToWatched, addToWatchlist} from '../store/actions/moviesActions';
import {RootState} from '../store/reducers/rootReducer';
import YoutubeEmbedVideoView from '../components/YoutubeEmbedVideoView';
import {useSimilarMovies} from '../hooks/api/useSimilarMovies';
import HorizontalMovieList from '../components/HorizontalMovieList';

type MovieScreenProps = StackScreenProps<
  RootStackNavigatorParams,
  AppRoute.MOVIE
>;

const MovieScreen: FC<MovieScreenProps> = ({route, navigation}) => {
  const movie = route.params;
  const [isHeaderTitleShown, setIsHeaderTitleShown] = useState(false);

  const dispatch = useDispatch();

  const similarMovies = useSimilarMovies(movie.id);

  const isInWatched = useSelector((state: RootState) =>
    state.movies.watched.some(e => e.id === movie.id),
  );
  const isInWatchist = useSelector((state: RootState) =>
    state.movies.watchlist.some(e => e.id === movie.id),
  );

  const {
    primaryVariantColorForegroundStyle,
    foregroundStyle,
    colorTheme,
    surfaceStyle,
  } = useColorTheme();

  const goBack = () => {
    navigation.pop();
  };

  const goGome = () => {
    navigation.popToTop();
  };

  const headerTitleOpacity = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const cardPosition = useSharedValue(1000);
  // updates scroll Y state
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;

      e.contentOffset.y > 230
        ? runOnJS(setIsHeaderTitleShown)(true)
        : runOnJS(setIsHeaderTitleShown)(false);
    },
  });

  // fades in image on screen load
  useEffect(() => {
    cardPosition.value = withTiming(0, {
      duration: 700,
    });
    opacity.value = withDelay(700, withTiming(1, {duration: 500}));
  }, []);

  // handles animations for image
  const animatedImageStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [-100, 0], [1.2, 1], {
      extrapolateRight: Extrapolation.CLAMP,
    });

    return {
      opacity: opacity.value,
      transform: [{scale: scale}],
    };
  });

  // handles animations for card
  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      top: cardPosition.value,
    };
  });

  useEffect(() => {
    headerTitleOpacity.value = isHeaderTitleShown
      ? withTiming(1)
      : withTiming(0);
  }, [isHeaderTitleShown]);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {opacity: headerTitleOpacity.value};
  }, []);

  const headerLeftButton: JSX.Element = (
    <Ionicons
      name="arrow-back-sharp"
      color={colorTheme.foreground}
      size={HEADER_ICON_SIZE}
      onPress={goBack}
    />
  );

  const headerMiddleElement: JSX.Element = (
    <Animated.Text
      numberOfLines={1}
      style={[
        {fontSize: 17},
        primaryVariantColorForegroundStyle,
        headerAnimatedStyle,
      ]}>
      {movie.title} ({moment(movie.release_date).year()})
    </Animated.Text>
  );

  const headerRightButton: JSX.Element = (
    <Ionicons
      key={'home'}
      name="home-sharp"
      color={colorTheme.foreground}
      size={HEADER_ICON_SIZE}
      onPress={goGome}
    />
  );

  return (
    <SafeAreaView edges={['top']} style={[styles.screenContaner, surfaceStyle]}>
      <MainHeader
        middleElement={headerMiddleElement}
        leftButton={headerLeftButton}
        rightButtons={[headerRightButton]}
      />

      {/* reflected image */}
      <Animated.View style={[styles.imageContainer, animatedImageStyle]}>
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
        <Animated.View
          style={[
            styles.card,
            surfaceStyle,
            cardOnlyTopShadow,
            animatedCardStyle,
          ]}>
          <View>
            {/* movie title */}
            <View style={styles.titleContainer}>
              <Text
                style={[{fontSize: 32}, primaryVariantColorForegroundStyle]}>
                {movie.title}
              </Text>
            </View>

            {/* movie release year and duration */}
            <View style={styles.yearAndDurationContainer}>
              <Text
                numberOfLines={1}
                style={[{fontSize: 16}, primaryVariantColorForegroundStyle]}>
                {moment(movie.release_date).format('LL')}
              </Text>
              <MovieDurationLabel runtime={movie.runtime} />
            </View>

            {/* horizontal separator */}
            <HorizontalSeparator
              style={styles.horizontalSeparator}
              color={colorTheme.foreground}
            />

            {/* watchlist and watched switch and like button */}
            <View style={styles.buttonsContainer}>
              <ToggleSwitch
                leftOptionOnPress={() => dispatch(addToWatchlist(movie))}
                rightOptionOnPress={() => dispatch(addToWatched(movie))}
                leftOptionActive={isInWatchist}
                rightOptionActive={isInWatched}
                width={80}
                height={22}
                leftOptionText="watchlist"
                rightOptionText="watched"
              />
              <BouncyHeartSwitch />
            </View>

            {/* genres horizontal list */}
            <GenresGroup genres={movie.genres} style={styles.genresContainer} />

            {/* embedded video player */}
            {movie.trailer_id ? (
              <YoutubeEmbedVideoView
                videoKey={movie.trailer_id}
                style={styles.embeddedPlayer}
              />
            ) : null}

            {/* movie description */}
            <View style={styles.descriptionContainer}>
              <Text style={[{fontSize: 16}, foregroundStyle]}>
                {movie.overview}
              </Text>
            </View>

            <View style={styles.similarMoviesContainer}>
              <Text
                style={[primaryVariantColorForegroundStyle, {fontSize: 16}]}>
                Similar Movies:
              </Text>
              <HorizontalMovieList
                movies={similarMovies}
                currentMovieId={movie.id}
              />
            </View>

            {/* cast */}
            <View style={styles.castMembersContainer}>
              <CreditGroup
                itemsDisplayLimit={8}
                groupName="Cast"
                items={movie.cast}
              />
            </View>

            {/* crew */}
            <View style={styles.crewMembersContainer}>
              <CreditGroup
                itemsDisplayLimit={6}
                groupName="Crew"
                items={movie.crew}
              />
            </View>
          </View>
        </Animated.View>
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
    opacity: 0,
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
  },
  yearAndDurationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: 10,
  },

  horizontalSeparator: {marginTop: 10},

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: 10,
  },

  genresContainer: {
    marginTop: 10,
  },
  descriptionContainer: {
    marginTop: 20,
  },
  castMembersContainer: {
    marginTop: 20,
  },
  crewMembersContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  embeddedPlayer: {
    marginTop: 20,
  },
  similarMoviesContainer: {
    marginTop: 15,
  },
});
