import axios, { AxiosInstance } from 'axios';

import { FetchHeaders } from '../../constants/fetch';

/** Request template. */
export const defaultRequestInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    [FetchHeaders.ApiKey]: import.meta.env.VITE_API_KEY,
  },
});
