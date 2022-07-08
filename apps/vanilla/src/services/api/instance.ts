import axios, { AxiosInstance } from 'axios';
import { HttpError } from '@js-camp/core/models/httpError';

import { HttpErrorDto } from '@js-camp/core/dtos/httpError.dto';
import { HttpErrorMapper } from '@js-camp/core/mappers/httpError.mapper';

import { FetchHeader } from '../../constants/fetch';

/**
 * Check if the error is of type HttpErrorDto.
 * @param error Some error.
 */
function isHttpErrorDto(error: unknown): error is HttpErrorDto {
  return (error as HttpErrorDto).detail !== undefined;
}

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

/** Request template. */
export const defaultRequestInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    [FetchHeader.ApiKey]: import.meta.env.VITE_API_KEY,
  },
});

defaultRequestInstance.interceptors.response.use(config => config, error => Promise.reject(generateError(error)));
