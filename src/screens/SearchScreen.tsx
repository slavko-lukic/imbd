import {StackScreenProps} from '@react-navigation/stack';
import React, {FC, useCallback, useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainHeader from '../components/MainHeader';
import MovieListItem from '../components/MovieListItem';
import SearchBar from '../components/SearchBar';
import SpringInView from '../components/SpringInView';
import VerticalSpacing from '../components/VerticalSpacing';
import {HEADER_ICON_SIZE} from '../constants/dimensions';
import {AppRoute} from '../enums/routes';
import {useSearch} from '../hooks/api/useSearch';
import {useColorTheme} from '../hooks/styles/useColorTheme';
import {Movie} from '../models';
import {RootStackNavigatorParams} from '../navigation/RootStackNavigator';

type SearchScreenProps = StackScreenProps<
  RootStackNavigatorParams,
  AppRoute.SEARCH
>;

const SearchScreen: FC<SearchScreenProps> = ({navigation}) => {
  const {backgroundStyle, colorTheme} = useColorTheme();

  const [queryText, setQueryText] = useState('');

  const {searchResults, search, isLoading, fetchNextPage} = useSearch();

  const renderItem: ListRenderItem<Movie> = useCallback(({item}) => {
    return <MovieListItem movie={item} />;
  }, []);

  const loadMoreMovies = () => {
    if (!isLoading) fetchNextPage();
  };

  const onSearch = () => {
    if (queryText) search(queryText);
  };

  const middlePart: JSX.Element = (
    <SearchBar value={queryText} onChangeText={setQueryText} />
  );

  const headerRightButton: JSX.Element = (
    <Ionicons
      key="search"
      name="search"
      color={colorTheme.primaryVariant}
      size={HEADER_ICON_SIZE}
      onPress={onSearch}
    />
  );
  const headerLeftButton: JSX.Element = (
    <SpringInView
      delay={700}
      offsetX={-100}
      springAnimationConfig={{damping: 12}}>
      <Ionicons
        key="close-circle-sharp"
        name="close-circle-sharp"
        color={colorTheme.foreground}
        size={HEADER_ICON_SIZE}
        onPress={() => navigation.pop()}
      />
    </SpringInView>
  );
  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.screenContainer, backgroundStyle]}>
      <MainHeader
        leftButton={headerLeftButton}
        middleElement={middlePart}
        rightButtons={headerRightButton}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<VerticalSpacing spacing={60} />}
        data={searchResults}
        renderItem={renderItem}
        onEndReached={loadMoreMovies}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    height: '100%',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
