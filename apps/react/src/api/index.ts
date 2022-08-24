import axios, { AxiosInstance } from 'axios';

import { HttpErrorMapper } from '@js-camp/core/mappers/httpError.mapper';
import { AppError } from '@js-camp/core/models/app-error';
import { isHttpErrorDto } from '@js-camp/core/utils/guards/error.guard';
import { isDefined } from '@js-camp/core/utils/guards/general.guard';

import { CONFIG } from './config';
import { addTokenBeforeRequest, refreshToken } from './interceptors';

export const http: AxiosInstance = axios.create({
  baseURL: CONFIG.apiUrl,
  headers: {
    'Api-Key': CONFIG.apiKey,
  },
});

http.interceptors.request.use(addTokenBeforeRequest, refreshToken);
http.interceptors.response.use(config => config, refreshToken);

/**
 * Generates HttpError from general error.
 * @param error Some error.
 */
export function generateError<T>(error: unknown): AppError<T> | null {
  if (axios.isAxiosError(error) && isDefined(error.response)) {
    const httpError = error.response;
    if (isDefined(httpError.data) && isHttpErrorDto<T>(httpError.data)) {
      return HttpErrorMapper.fromDto<T>(httpError.data);
    }
  }

  return null;
}
