import { HttpErrorDto } from '../dtos/httpError.dto';
import { HttpError } from '../models/httpError';

export namespace HttpErrorMapper {

  /**
   * Maps dto to model.
   * @param dto Genre dto.
   */
  export function fromDto(dto: HttpErrorDto): HttpError {
    return new HttpError({ detail: dto.detail });
  }
}
