import axios, { AxiosInstance } from 'axios';

import { FetchHeaders } from '../constants/fetch';

/**
 * Axios request template.
 */
export const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    [FetchHeaders.ApiKey]: import.meta.env.VITE_API_KEY,
  },
});
