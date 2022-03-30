import {useEffect, useState} from 'react';
import {useInfiniteQuery} from 'react-query';
import {Movie} from '../../models';
import {axiosGet} from '../../utilities/api';

const fetchPopular = async (pageParam: number) => {
  const params = {
    api_key: 'e0966f5c25707b5d4f4f5a1670429967',
    page: pageParam,
  };
  const popular = await axiosGet(`/movie/popular`, params);
  return popular.data;
};

export const usePopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  const {data, isFetching, fetchNextPage} = useInfiniteQuery(
    'popular',
    ({pageParam = 1}) => fetchPopular(pageParam),
    {
      getNextPageParam: lastPage => {
        if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
        return undefined;
      },
    },
  );

  useEffect(() => {
    const newPage = data?.pages[data?.pages.length - 1].results;
    if (newPage) setPopularMovies(prev => [...prev, ...newPage]);
  }, [data?.pages]);

  return {popularMovies, isFetching, fetchNextPage};
};
