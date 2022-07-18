import { HttpErrorDto } from '../dtos/httpError.dto';
import { HttpError } from '../models/httpError';

export namespace HttpErrorMapper {

  /**
   * Maps dto to model.
   * @param dto Http error dto.
   */
  export function fromDto(dto: HttpErrorDto): HttpError {
    return new HttpError({ ...dto, message: dto.detail });
  }
}
