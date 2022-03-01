import {AxiosResponse} from 'axios';
import {useEffect, useState} from 'react';
import {axiosGet} from '../utilities/api';

export const useAxiosFetch = (
  url: string,
  queryParams?: URLSearchParams,
  headers?: any,
): {
  response: AxiosResponse | null;
  error: Error | null;
  isLoading: boolean;
} => {
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController: AbortController = new AbortController();

    axiosGet(url, queryParams, headers, abortController.signal)
      .then(res => {
        setResponse(res);
      })
      .catch((error: Error) => {
        if (error.name === 'AbortError') console.log('Fetch aborted');
        else setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  return {response, error, isLoading};
};
