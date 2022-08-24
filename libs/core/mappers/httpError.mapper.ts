import { HttpErrorDto } from '../dtos/httpError.dto';
import { AppError } from '../models/app-error';

export namespace HttpErrorMapper {

  /**
   * Maps dto to model.
   * @param dto Http error dto.
   */
  export function fromDto<T>(dto: HttpErrorDto<T>): AppError<T> {
    return new AppError<T>(dto.data, dto.detail);
  }
}
