import React, {FC, useCallback, useMemo, useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeader from '../components/MainHeader';
import {MovieListTypes} from '../enums/movieListTypes';
import MovieCard from '../components/MovieCard';
import {Movie} from '../models/Movie';
import MovieListSelectorButton from '../components/MovieListSelectorButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HEADER_ICON_SIZE} from '../constants/dimensions';
import {AppRoute} from '../enums/routes';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabNavigatorParams} from '../navigation/BottomTabs';
import VerticalSpacing from '../components/VerticalSpacing';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import MovieGridItem from '../components/MovieGridItem';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducers/rootReducer';
import {MovieViewTypes} from '../enums/movieViewTypes';
import MovieViewTypeSwitch from '../components/MovieViewTypeSwitch';
import MovieListItem from '../components/MovieListItem';
import {usePopularMovies} from '../hooks/api/usePopularMovies';

type MoviesScreenProps = BottomTabScreenProps<
  BottomTabNavigatorParams,
  AppRoute.MOVIES
>;

const MoviesScreen: FC<MoviesScreenProps> = ({navigation}) => {
  const {colorTheme, backgroundStyle} = useColorTheme();

  const currentViewType = useSelector(
    (state: RootState) => state.settings.movieViewType,
  );

  const [currentDisplayedList, setCurrentDisplayedList] =
    useState<MovieListTypes>(MovieListTypes.POPULAR);

  const watched = useSelector((state: RootState) => state.movies.watched);
  const watchlist = useSelector((state: RootState) => state.movies.watchlist);
  const {popularMovies, isFetching, fetchNextPage} = usePopularMovies();

  const listData = useMemo(() => {
    switch (currentDisplayedList) {
      case MovieListTypes.POPULAR:
        return popularMovies;
      case MovieListTypes.WATCHED:
        return watched;
      case MovieListTypes.WATCHLIST:
        return watchlist;
      default:
        return popularMovies;
    }
  }, [currentDisplayedList, popularMovies, watched, watchlist]);

  const switchCurrentDisplayedList = () => {
    switch (currentDisplayedList) {
      case MovieListTypes.POPULAR:
        setCurrentDisplayedList(MovieListTypes.WATCHED);
        break;
      case MovieListTypes.WATCHED:
        setCurrentDisplayedList(MovieListTypes.WATCHLIST);
        break;
      case MovieListTypes.WATCHLIST:
        setCurrentDisplayedList(MovieListTypes.POPULAR);
        break;
      default:
        setCurrentDisplayedList(MovieListTypes.POPULAR);
        break;
    }
  };

  const goToSettings = () => {
    navigation.navigate(AppRoute.SETTINGS);
  };

  const goToSearch = () => {
    navigation.navigate(AppRoute.SEARCH);
  };

  const loadMoreMovies = () => {
    if (!isFetching) fetchNextPage();
  };

  const keyExtractor = (item: Movie) => {
    return currentViewType + item.id;
  };

  const renderItem: ListRenderItem<Movie> = useCallback(
    ({item}) => {
      switch (currentViewType) {
        case MovieViewTypes.CARDS:
          return <MovieCard movie={item} />;
        case MovieViewTypes.LIST:
          return <MovieListItem movie={item} />;
        case MovieViewTypes.GRID:
          return <MovieGridItem movie={item} />;
        default:
          return <MovieCard movie={item} />;
      }
    },
    [currentViewType],
  );

  const headerLeftButton: JSX.Element = (
    <MovieListSelectorButton
      title={currentDisplayedList}
      onPress={switchCurrentDisplayedList}
    />
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
        keyExtractor={keyExtractor}
        numColumns={currentViewType === MovieViewTypes.GRID ? 3 : undefined}
        ListFooterComponent={
          currentViewType === MovieViewTypes.GRID ? null : listFooter
        }
        data={listData}
        renderItem={renderItem}
        onEndReached={loadMoreMovies}
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
