import axios, { AxiosInstance } from 'axios';

import { FetchHeaders } from '../constants/fetch';

/**
 * Create axios a request template.
 */
export function getInstance(): AxiosInstance {
  return axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      [FetchHeaders.ApiKey]: import.meta.env.VITE_API_KEY,
    },
  });
}
