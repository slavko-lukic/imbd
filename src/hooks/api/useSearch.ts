import {useQuery} from 'react-query';
import {Movie} from '../../models';
import {axiosGet} from '../../utilities/api';

const fetchSearchResults = async (query: string) => {
  if (!query) return [];

  const params = {
    api_key: 'e0966f5c25707b5d4f4f5a1670429967',
    query: query,
    include_adult: false,
  };
  const searchResults = await axiosGet(`/search/movie`, params);
  return searchResults.data.results;
};

export const useSearch = (queryText: string) => {
  const {data, refetch, isRefetching, isLoading, isFetching, remove} = useQuery<
    Movie[]
  >('search', () => fetchSearchResults(queryText), {
    enabled: false,
    initialData: [],
  });

  return {
    data: data,
    refetch: refetch,
    isLoading: isLoading || isRefetching || isFetching,
  };
};
