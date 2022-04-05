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

// const goToMovie = useCallback(async (movie: Movie) => {
//   const params = {
//     api_key: 'e0966f5c25707b5d4f4f5a1670429967',
//   };

//   const creditsResponse = await axiosGet(
//     `/movie/${movie.id}/credits`,
//     params,
//   );
//   const detailsResponse = await axiosGet(`/movie/${movie.id}`, params);

//   const movieCrew: Crew[] = creditsResponse.data.crew;

//   const directorsIndex = movieCrew.findIndex(cast => cast.job === 'Director');
//   movieCrew.unshift(...movieCrew.splice(directorsIndex, 1));

//   const detailedMovie: DetailedMovie = {
//     ...movie,
//     backdrop_path: detailsResponse.data.backdrop_path,
//     runtime: detailsResponse.data.runtime,
//     genres: detailsResponse.data.genres,
//     cast: creditsResponse.data.cast,
//     crew: movieCrew,
//   };

//   navigation.navigate(AppRoute.MOVIE, detailedMovie);
// }, []);
