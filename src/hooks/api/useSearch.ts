import {useCallback, useEffect, useState} from 'react';
import {useInfiniteQuery} from 'react-query';
import {Movie} from '../../models';
import {axiosGet} from '../../utilities/api';

const fetchSearchResults = async (query: string, page: number) => {
  if (!query) return [];

  const params = {
    api_key: 'e0966f5c25707b5d4f4f5a1670429967',
    query: query,
    page: page,
    include_adult: false,
  };
  const searchResults = await axiosGet(`/search/movie`, params);
  return searchResults.data;
};

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const {
    data,
    refetch,
    fetchNextPage,
    isRefetching,
    isLoading,
    isFetching,
    remove,
  } = useInfiniteQuery(
    'search',
    ({pageParam = 1}) => fetchSearchResults(searchQuery, pageParam),
    {
      enabled: false,
      getNextPageParam: lastPage => {
        if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
        return undefined;
      },
    },
  );

  useEffect(() => {
    const newPage = data?.pages[data?.pages.length - 1].results;
    if (newPage) setSearchResults(prev => [...prev, ...newPage]);
  }, [data?.pages]);

  const search = useCallback((searchText: string) => {
    setSearchQuery(searchText);
  }, []);

  useEffect(() => {
    setSearchResults([]);
    remove();
    refetch();
  }, [searchQuery]);

  return {
    searchResults: searchResults,
    search: search,
    isLoading: isLoading || isRefetching || isFetching,
    fetchNextPage: fetchNextPage,
  };
};
