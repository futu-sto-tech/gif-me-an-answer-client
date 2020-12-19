import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create();
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
