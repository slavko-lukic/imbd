import React, {FC, useCallback, useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeader from '../components/MainHeader';
import {MovieListTypes} from '../enums/movieListTypes';
import MovieCard from '../components/MovieCard';
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
import MovieViewTypeSwitch from '../components/MovieViewTypeSwitch';
import MovieListItem from '../components/MovieListItem';

type MoviesScreenProps = BottomTabScreenProps<
  BottomTabNavigatorParams,
  AppRoute.MOVIES
>;

const MoviesScreen: FC<MoviesScreenProps> = ({navigation}) => {
  const {colorTheme, backgroundStyle} = useColorTheme();

  const currentViewType = useSelector(
    (state: RootState) => state.settings.movieViewType,
  );

  const [listData, setListData] = useState<Movie[]>([]);

  const listDataUpdateHandler = useCallback((displayedList: MovieListTypes) => {
    switch (displayedList) {
      case MovieListTypes.WATCHLIST:
        setListData([]);
        break;
      case MovieListTypes.POPULAR:
        setListData([]);
        break;
      case MovieListTypes.WATCHED:
        setListData([]);
        break;
      default:
        setListData([]);
        break;
    }
  }, []);

  const goToSettings = () => {
    navigation.navigate(AppRoute.SETTINGS);
  };

  const goToSearch = () => {
    navigation.navigate(AppRoute.SEARCH);
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
      backdrop_path: detailsResponse.data.backdrop_path,
      runtime: detailsResponse.data.runtime,
      genres: detailsResponse.data.genres,
      cast: creditsResponse.data.cast,
      crew: movieCrew,
    };

    navigation.navigate(AppRoute.MOVIE, detailedMovie);
  };

  const renderItem: ListRenderItem<Movie> = ({item, index}) => {
    switch (currentViewType) {
      case MovieViewTypes.CARDS:
        return (
          <MovieCard
            movie={item}
            index={index}
            onPress={() => goToMovie(item)}
          />
        );
      case MovieViewTypes.LIST:
        return (
          <MovieListItem
            movie={item}
            index={index}
            onPress={() => goToMovie(item)}
          />
        );
      case MovieViewTypes.GRID:
        return (
          <MovieGridItem
            movie={item}
            index={index}
            onPress={() => goToMovie(item)}
          />
        );
      default:
        return (
          <MovieCard
            movie={item}
            index={index}
            onPress={() => goToMovie(item)}
          />
        );
    }
  };

  const headerLeftButton: JSX.Element = (
    <MovieListSelectorButton updateListData={listDataUpdateHandler} />
  );
  const headerRightButtons: JSX.Element[] = [
    <MovieViewTypeSwitch key={'movieViewTypeSwitch'} />,
    <Ionicons
      key="settings-sharp"
      name="settings-sharp"
      style={{marginLeft: 10}}
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
      onPress={goToSearch}
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
        showsVerticalScrollIndicator={false}
        key={currentViewType}
        keyExtractor={item => currentViewType + item.id}
        numColumns={currentViewType === MovieViewTypes.GRID ? 3 : undefined}
        ListFooterComponent={
          currentViewType === MovieViewTypes.GRID ? null : listFooter
        }
        data={listData}
        renderItem={renderItem}
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
