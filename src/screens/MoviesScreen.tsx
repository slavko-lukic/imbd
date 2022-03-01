import React, {useState} from 'react';
import {ListRenderItem} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeader from '../components/MainHeader';
import colors from '../constants/colors';
import {MovieListTypes} from '../enums/movieListTypes';
import MovieCard from '../components/MovieCard';
import {SUGGESTED_MOVIES, WATCHED_MOVIES, WATCHLIST} from '../mock/movies_mock';
import {Movie} from '../models/movie';
import {FlatList} from 'react-native-gesture-handler';
import MovieListSelectorButton from '../components/MovieListSelectorButton';

const MoviesScreen = () => {
  const [displayedList, setDisplayedList] = useState<MovieListTypes>(
    MovieListTypes.SUGGESTIONS,
  );
  const [listData, setListData] = useState<Movie[]>(SUGGESTED_MOVIES);

  const renderItem: ListRenderItem<Movie> = ({item, index}) => (
    <MovieCard movie={item} index={index} />
  );

  const onSwitchListHandler = () => {
    switch (displayedList) {
      case MovieListTypes.WATCHED:
        setDisplayedList(MovieListTypes.WATCHLIST);
        setListData(WATCHLIST);
        break;
      case MovieListTypes.WATCHLIST:
        setDisplayedList(MovieListTypes.SUGGESTIONS);
        setListData(SUGGESTED_MOVIES);
        break;
      case MovieListTypes.SUGGESTIONS:
        setDisplayedList(MovieListTypes.WATCHED);
        setListData(WATCHED_MOVIES);
        break;
      default:
        setDisplayedList(MovieListTypes.SUGGESTIONS);
        setListData(SUGGESTED_MOVIES);
        break;
    }
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={{backgroundColor: colors.BACKGROUND, flex: 1, height: '100%'}}>
      <MainHeader
        leftButton={
          <MovieListSelectorButton
            switchList={onSwitchListHandler}
            selectedList={displayedList}
          />
        }
      />
      <FlatList data={listData} renderItem={renderItem} />
    </SafeAreaView>
  );
};

export default MoviesScreen;
