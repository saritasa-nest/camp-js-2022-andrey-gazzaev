import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { HttpError } from '@js-camp/core/models/httpError';
import { HttpErrorMapper } from '@js-camp/core/mappers/httpError.mapper';
import { isHttpErrorDto } from '@js-camp/core/utils/guards/error.guard';
import { Tokens } from '@js-camp/core/models/tokens';

import { FetchHeader } from '../../constants/fetch';
import { LocalStorageKey } from '../../constants/localStorage';
import { LocalStorageService } from '../domain/localStorage';

import { fetchRefreshToken } from './auth';

const REFRESH_TOKEN_URL = 'auth/token/refresh/';

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

  const UNKNOWN_ERROR = 'Unexpected error';
  return new HttpError({ detail: UNKNOWN_ERROR });
}

/**
 * Re-request.
 * @param config Previous request configuration.
 */
function retryResponse(config: AxiosRequestConfig): Promise<AxiosResponse | null> {
  const tokens = LocalStorageService.getValue<Tokens>(LocalStorageKey.TOKENS);
  if (config.url !== undefined && tokens !== null) {
    const response = defaultRequestInstance.options(config.url, {
      method: config.method,
      headers: {
        ...config.headers,
        [FetchHeader.Authorization]: `Bearer ${tokens.access}`,
      },
    });

    return response;
  }
  return Promise.resolve(null);
}

/** Request template. */
export const defaultRequestInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    [FetchHeader.ApiKey]: import.meta.env.VITE_API_KEY,

  },
});

defaultRequestInstance.interceptors.request.use(config => {
  const tokens = LocalStorageService.getValue<Tokens>(LocalStorageKey.TOKENS);
  if (tokens !== null && config.headers !== undefined) {
    config.headers[FetchHeader.Authorization] = `Bearer ${tokens.access}`;
  }
  return config;
});

defaultRequestInstance.interceptors.response.use(config => config, async error => {
  const tokens = LocalStorageService.getValue<Tokens>(LocalStorageKey.TOKENS);

  if (axios.isAxiosError(error) && tokens !== null) {

    if (error.config.url === REFRESH_TOKEN_URL) {
      return Promise.reject(generateError(error));
    }

    if (error.response !== undefined && Number(error.response.status) !== 401) {
      return Promise.reject(generateError(error));
    }

    try {
      LocalStorageService.setValue(LocalStorageKey.TOKENS, await fetchRefreshToken(tokens.refresh));
      const response = await retryResponse(error.config);
      if (response !== null) {
        return Promise.resolve(response.data);
      }

      return Promise.reject(generateError(error));
    } catch {
      LocalStorageService.setValue(LocalStorageKey.TOKENS, null);

      const URL_LOGIN_PAGE = '/login/';
      location.href = URL_LOGIN_PAGE;
    }
  }

  return Promise.reject(generateError(error));
});
