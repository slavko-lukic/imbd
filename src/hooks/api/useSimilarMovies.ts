import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {Movie} from '../../models';
import {axiosGet} from '../../utilities/api';

const fetchSimilar = async (movieId: number, abortSignal: AbortSignal) => {
  const params = {
    api_key: 'e0966f5c25707b5d4f4f5a1670429967',
  };
  const popular = await axiosGet(
    `/movie/${movieId}/similar`,
    params,
    undefined,
    abortSignal,
  );
  return popular.data.results;
};

export const useSimilarMovies = (movieId: number) => {
  const controller = new AbortController();

  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  useEffect(() => {
    fetchSimilar(movieId, controller.signal).then(similarMovies => {
      setSimilarMovies(similarMovies);
    });

    return () => {
      setSimilarMovies([]);
      controller.abort();
    };
  }, [movieId]);

  return similarMovies;
};
