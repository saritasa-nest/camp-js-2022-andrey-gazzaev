import axios, { AxiosError } from 'axios';

import { HttpErrorDto } from '@js-camp/core/dtos/httpError.dto';
import { HttpErrorMapper } from '@js-camp/core/mappers/httpError.mapper';
import { HttpError } from '@js-camp/core/models/httpError';

/**
 * Generate predictable error.
 * @param error Some error.
 */
export function generateError(error: unknown): HttpError {
  if (axios.isAxiosError(error)) {
    const httpError = error as AxiosError<HttpErrorDto>;
    if (httpError.response !== undefined) {
      return HttpErrorMapper.fromDto(httpError.response.data);
    }
  }

  const UNKNOWN_ERROR = 'Unexpected error';
  return new HttpError({ detail: UNKNOWN_ERROR });
}
