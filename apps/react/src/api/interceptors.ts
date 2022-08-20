import { isDefined } from '@js-camp/core/utils/guards/general.guard';
import axios, { AxiosRequestConfig } from 'axios';

import { CONFIG } from './config';
import { AuthService } from './services/authService';
import { TokenService } from './services/tokenService';

import { http } from '.';

/**
 * Checks if a request should be intercepted.
 * @param config - Request config.
 */
export function shouldInterceptToken(config: AxiosRequestConfig): boolean {
  return config.baseURL?.startsWith(CONFIG.apiUrl) ?? false;
}

/**
 * Checks if a request should be intercepted.
 * @param config Request config.
 */
export function shouldInterceptAuth(config: AxiosRequestConfig): boolean {
  const authUrl = new URL('auth', CONFIG.apiUrl);
  return config.url?.startsWith(authUrl.toString()) ?? false;
}

/**
 * Interceptor to append token to requests.
 * @param config Axios config.
 */
export async function addTokenBeforeRequest(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
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
      'No headers. Hmm, maybe you should check the headers??',
    );
  }

  return {
    ...config,
    headers: {
      ...headers,
      Authorization: `Bearer ${token.access}`,
    },
  };
}

/**
 * Interceptor refresh token.
 * @param error Some error.
 */
export async function refreshToken(error: unknown) {
  const token = await TokenService.get();

  if (!axios.isAxiosError(error) || !isDefined(token)) {
    throw error;
  }

  if (shouldInterceptAuth(error.config) || isDefined(error.response) && Number(error.response.status) !== 401) {
    throw error;
  }

  try {
    const newToken = await AuthService.refreshToken(token);
    TokenService.save(newToken);
    return http(error.config);
  } catch {
    TokenService.remove();
  }

  throw error;
}
