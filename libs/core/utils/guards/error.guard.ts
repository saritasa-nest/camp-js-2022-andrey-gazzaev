import { HttpErrorDto } from '../../dtos/httpError.dto';

/**
 * Checks if the error is of type HttpErrorDto.
 * @param error Some error.
 */
export function isHttpErrorDto<T>(error: unknown): error is HttpErrorDto<T> {
  return (error as HttpErrorDto<T>).detail !== undefined;
}
