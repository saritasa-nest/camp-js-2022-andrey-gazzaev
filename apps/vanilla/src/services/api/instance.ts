import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { HttpError } from '@js-camp/core/models/httpError';
import { HttpErrorMapper } from '@js-camp/core/mappers/httpError.mapper';
import { isHttpErrorDto } from '@js-camp/core/utils/guards/error.guard';

import { FetchHeader } from '../../constants/fetch';
import { TokenService } from '../domain/token';

import { fetchRefreshToken } from './auth';

const REFRESH_TOKEN_URL = 'auth/token/refresh/';
const UNKNOWN_ERROR = 'Unexpected error';

/**
 * Generates HttpError from general error.
 * @param error Some error.
 */
function generateError(error: unknown): HttpError {
  if (axios.isAxiosError(error) && error.response !== undefined) {
    const httpError = error.response;
    if (httpError.data !== undefined && isHttpErrorDto(httpError.data)) {
      return HttpErrorMapper.fromDto(httpError.data);
    }
  }

  return new HttpError({ detail: UNKNOWN_ERROR, message: UNKNOWN_ERROR, name: UNKNOWN_ERROR });
}

/**
 * Re-request.
 * @param config Previous request configuration.
 */
function retryResponse(config: AxiosRequestConfig): Promise<AxiosResponse | null> {
  const tokens = TokenService.getTokens();
  if (config.url !== undefined && tokens !== null) {
    return defaultRequestInstance.options(config.url, {
      method: config.method,
      headers: {
        ...config.headers,
        [FetchHeader.Authorization]: `Bearer ${tokens.access}`,
      },
    });
  }
  return Promise.resolve(null);
}

/** Request template. */
export const defaultRequestInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    [FetchHeader.ApiKey]: import.meta.env.VITE_API_KEY,

  },
});

defaultRequestInstance.interceptors.request.use(config => {
  const tokens = TokenService.getTokens();
  if (tokens !== null && config.headers !== undefined) {
    config.headers[FetchHeader.Authorization] = `Bearer ${tokens.access}`;
  }

  return config;
});

defaultRequestInstance.interceptors.response.use(config => config, async error => {
  const tokens = TokenService.getTokens();

  if (axios.isAxiosError(error) && tokens !== null) {

    if (error.config.url === REFRESH_TOKEN_URL) {
      return Promise.reject(generateError(error));
    }

    if (error.response !== undefined && Number(error.response.status) !== 401) {
      return Promise.reject(generateError(error));
    }

    try {
      TokenService.setTokens(await fetchRefreshToken(tokens.refresh));
      const response = await retryResponse(error.config);
      if (response !== null) {
        return Promise.resolve(response.data);
      }

      return Promise.reject(generateError(error));
    } catch {
     TokenService.resetTokens();

      const URL_LOGIN_PAGE = '/login/';
      location.href = URL_LOGIN_PAGE;
    }
  }

  return Promise.reject(generateError(error));
});
