import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {BASE_URL} from '../constants/api';

export const axiosGet = (
  path: string,
  queryParams?: URLSearchParams,
  headers?: any,
  abortSignal?: AbortSignal,
) => {
  return axiosRequest(
    'GET',
    path,
    undefined,
    queryParams,
    headers,
    abortSignal,
  );
};

export const axiosPost = (
  path: string,
  body?: any,
  queryParams?: URLSearchParams,
  headers?: any,
  abortSignal?: AbortSignal,
) => {
  return axiosRequest('POST', path, body, queryParams, headers, abortSignal);
};

const axiosRequest = async (
  method: 'POST' | 'GET' | 'PATCH' | 'DELETE' | 'PUT',
  path: string,
  body?: any,
  queryParams?: URLSearchParams,
  headers?: any,
  abortSignal?: AbortSignal,
) => {
  const axiosConfig: AxiosRequestConfig = {
    url: BASE_URL + path,
    method: method,
    timeout: 10000,
    params: queryParams,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...headers,
    },
    signal: abortSignal,
  };

  // sets `data` to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', 'DELETE', and 'PATCH'
  if (method !== 'GET' && body) axiosConfig.data = body;

  try {
    const response: AxiosResponse = await axios(axiosConfig);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};
