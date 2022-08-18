import { AxiosRequestConfig } from 'axios';

import { CONFIG } from './config';
import { TokenService } from './services/tokenService';

/**
 * Checks if a request should be intercepted.
 * @param config - Request config.
 */
function shouldInterceptToken(config: AxiosRequestConfig): boolean {
  return config.baseURL?.startsWith(CONFIG.apiUrl) ?? false;
}

/**
 * Interceptor to append token to requests.
 * @param config Axios config.
 */
export const addTokenBeforeRequest = async(config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  if (!shouldInterceptToken(config)) {
    return config;
  }

  const token = await TokenService.get();

  if (token == null) {
    return config;
  }

  const { headers } = config;

  if (headers == null) {
    throw new Error(
      'Axios did not pass any header. Please check your request.',
    );
  }

  return {
    ...config,
    headers: {
      ...headers,
      Authorization: `Bearer ${token.access}`,
    },
  };
};
