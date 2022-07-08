import axios, { AxiosInstance } from 'axios';

import { FetchHeader } from '../../constants/fetch';

/** Request template. */
export const defaultRequestInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    [FetchHeader.ApiKey]: import.meta.env.VITE_API_KEY,
  },
});
