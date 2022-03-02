import React, {FC, useCallback, useState} from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeader from '../components/MainHeader';
import colors from '../constants/colors';
import {MovieListTypes} from '../enums/movieListTypes';
import MovieCard from '../components/MovieCard';
import {SUGGESTED_MOVIES, WATCHED_MOVIES, WATCHLIST} from '../mock/movies_mock';
import {Movie} from '../models/Movie';
import MovieListSelectorButton from '../components/MovieListSelectorButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HEADER_ICON_SIZE} from '../constants/dimensions';
import {AppRoute} from '../enums/routes';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {BottomTabNavigatorParams} from '../navigation/BottomTabs';

type MoviesScreenProps = BottomTabScreenProps<
  BottomTabNavigatorParams,
  AppRoute.MOVIES
>;

const MoviesScreen: FC<MoviesScreenProps> = ({navigation}) => {
  const [listData, setListData] = useState<Movie[]>(SUGGESTED_MOVIES);

  const renderItem: ListRenderItem<Movie> = ({item, index}) => (
    <MovieCard movie={item} index={index} />
  );

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

  const headerLeftButton: JSX.Element = (
    <MovieListSelectorButton updateListData={listDataUpdateHandler} />
  );
  const headerRightButton: JSX.Element = (
    <Ionicons
      name="settings-sharp"
      color={colors.WHITE}
      size={HEADER_ICON_SIZE}
      onPress={goToSettings}
    />
  );

  return (
    <SafeAreaView
      edges={['top']}
      style={{backgroundColor: colors.BACKGROUND, flex: 1, height: '100%'}}>
      <MainHeader
        leftButton={headerLeftButton}
        rightButton={headerRightButton}
      />
      <FlatList data={listData} renderItem={renderItem} />
    </SafeAreaView>
  );
};

export default MoviesScreen;
