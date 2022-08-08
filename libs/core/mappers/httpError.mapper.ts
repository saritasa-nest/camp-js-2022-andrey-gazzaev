import { HttpErrorDto } from '../dtos/httpError.dto';
import { AppError } from '../models/httpError';

export namespace HttpErrorMapper {

  /**
   * Maps dto to model.
   * @param dto Http error dto.
   */
  export function fromDto(dto: HttpErrorDto): AppError {
    return new AppError({ ...dto, message: dto.detail });
  }
}
