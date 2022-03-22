import React, {FC, useCallback, useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeader from '../components/MainHeader';
import {MovieListTypes} from '../enums/movieListTypes';
import MovieCard from '../components/MovieCard';
import {SUGGESTED_MOVIES, WATCHED_MOVIES, WATCHLIST} from '../mock/movies_mock';
import {DetailedMovie, Movie} from '../models/Movie';
import MovieListSelectorButton from '../components/MovieListSelectorButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HEADER_ICON_SIZE} from '../constants/dimensions';
import {AppRoute} from '../enums/routes';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabNavigatorParams} from '../navigation/BottomTabs';
import VerticalSpacing from '../components/VerticalSpacing';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {axiosGet} from '../utilities/api';
import {Crew} from '../models';
import MovieGridItem from '../components/MovieGridItem';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducers/rootReducer';
import {MovieViewTypes} from '../enums/movieViewTypes';

type MoviesScreenProps = BottomTabScreenProps<
  BottomTabNavigatorParams,
  AppRoute.MOVIES
>;

const MoviesScreen: FC<MoviesScreenProps> = ({navigation}) => {
  const {colorTheme, backgroundStyle} = useColorTheme();

  const viewType = useSelector(
    (state: RootState) => state.settings.movieViewType,
  );

  const [listData, setListData] = useState<Movie[]>(SUGGESTED_MOVIES);

  const listDataUpdateHandler = useCallback((displayedList: MovieListTypes) => {
    switch (displayedList) {
      case MovieListTypes.WATCHLIST:
        setListData(WATCHLIST);
        break;
      case MovieListTypes.SUGGESTIONS:
        setListData(SUGGESTED_MOVIES);
        break;
      case MovieListTypes.WATCHED:
        setListData(WATCHED_MOVIES);
        break;
      default:
        setListData(SUGGESTED_MOVIES);
        break;
    }
  }, []);

  const goToSettings = () => {
    navigation.navigate(AppRoute.SETTINGS);
  };

  const goToMovie = async (movie: Movie) => {
    const params = {
      api_key: 'e0966f5c25707b5d4f4f5a1670429967',
      language: 'en-US',
    };

    const creditsResponse = await axiosGet(
      `/movie/${movie.id}/credits`,
      params,
    );
    const detailsResponse = await axiosGet(`/movie/${movie.id}`, params);

    const movieCrew: Crew[] = creditsResponse.data.crew;

    const directorsIndex = movieCrew.findIndex(cast => cast.job === 'Director');
    movieCrew.unshift(...movieCrew.splice(directorsIndex, 1));

    const detailedMovie: DetailedMovie = {
      ...movie,
      runtime: detailsResponse.data.runtime,
      genres: detailsResponse.data.genres,
      cast: creditsResponse.data.cast,
      crew: movieCrew,
    };

    navigation.navigate(AppRoute.MOVIE, detailedMovie);
  };

  const renderListItems: ListRenderItem<Movie> = ({item, index}) => (
    <MovieCard movie={item} index={index} onPress={() => goToMovie(item)} />
  );

  const renderGridItems: ListRenderItem<Movie> = ({item, index}) => {
    return (
      <MovieGridItem
        movie={item}
        index={index}
        onPress={() => goToMovie(item)}
      />
    );
  };

  const headerLeftButton: JSX.Element = (
    <MovieListSelectorButton updateListData={listDataUpdateHandler} />
  );
  const headerRightButtons: JSX.Element[] = [
    <Ionicons
      key="settings-sharp"
      name="settings-sharp"
      color={colorTheme.foreground}
      size={HEADER_ICON_SIZE}
      onPress={goToSettings}
    />,
    <Ionicons
      key="search"
      name="search"
      style={{marginLeft: 10}}
      color={colorTheme.foreground}
      size={HEADER_ICON_SIZE}
      onPress={() => {
        navigation.navigate(AppRoute.SEARCH);
      }}
    />,
  ];

  const listFooter = <VerticalSpacing spacing={60} />;

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.screenContaner, backgroundStyle]}>
      <MainHeader
        leftButton={headerLeftButton}
        rightButtons={headerRightButtons}
      />
      <FlatList
        key={viewType}
        keyExtractor={item => viewType + item.id}
        numColumns={viewType === MovieViewTypes.GRID ? 3 : undefined}
        ListFooterComponent={
          viewType === MovieViewTypes.GRID ? null : listFooter
        }
        data={listData}
        renderItem={
          viewType === MovieViewTypes.GRID ? renderGridItems : renderListItems
        }
      />
    </SafeAreaView>
  );
};

export default MoviesScreen;

const styles = StyleSheet.create({
  screenContaner: {
    flex: 1,
    height: '100%',
  },
});
