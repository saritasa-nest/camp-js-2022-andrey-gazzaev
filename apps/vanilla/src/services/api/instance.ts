import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { HttpError } from '@js-camp/core/models/httpError';
import { HttpErrorMapper } from '@js-camp/core/mappers/httpError.mapper';
import { isHttpErrorDto } from '@js-camp/core/utils/guards/error.guard';
import { isNotFalsy } from '@js-camp/core/utils/guards/general.guard';

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
  if (axios.isAxiosError(error) && isNotFalsy(error.response)) {
    const httpError = error.response;
    if (isNotFalsy(httpError.data) && isHttpErrorDto(httpError.data)) {
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
  if (isNotFalsy(config.url) && isNotFalsy(tokens)) {
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
  if (isNotFalsy(tokens) && isNotFalsy(config.headers)) {
    config.headers[FetchHeader.Authorization] = `Bearer ${tokens.access}`;
  }
  return config;
});

defaultRequestInstance.interceptors.response.use(config => config, async error => {
  const tokens = TokenService.getTokens();

  if (axios.isAxiosError(error) && isNotFalsy(tokens)) {

    if (error.config.url === REFRESH_TOKEN_URL) {
      return Promise.reject(generateError(error));
    }

    if (isNotFalsy(error.response) && Number(error.response.status) !== 401) {
      return Promise.reject(generateError(error));
    }

    try {
      TokenService.setTokens(await fetchRefreshToken(tokens.refresh));
      const response = await retryResponse(error.config);
      if (isNotFalsy(response)) {
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
