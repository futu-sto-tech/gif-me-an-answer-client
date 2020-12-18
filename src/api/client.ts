import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const axiosInstance = axios.create();

const baseURL = '<ADD BASE URL>'; // TO-DO

export async function apiFetcher(config: AxiosRequestConfig) {
  const response = await axiosInstance(
    {
      ...config,
      baseURL: baseURL,
      Accept: `application/json`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      ...config.headers,
    },
    config.data || null,
  );

  return response.data;
}
