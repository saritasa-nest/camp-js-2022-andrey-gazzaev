import { HttpErrorDto } from '../dtos/httpError.dto';

/**
 * Checks if the error is of type HttpErrorDto.
 * @param error Some error.
 */
export function isHttpErrorDto(error: unknown): error is HttpErrorDto {
  return (error as HttpErrorDto).detail !== undefined;
}
