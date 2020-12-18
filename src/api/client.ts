import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create();
const baseURL = 'https://gif-me-an-answer-server.herokuapp.com/api/v1';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
