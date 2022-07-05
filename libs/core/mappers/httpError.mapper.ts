import { HttpErrorDto } from '../dtos/httpError.dto';
import { ErrorData, HttpError } from '../models/httpError';

export namespace HttpErrorMapper {

  /**
   * Maps dto to model.
   * @param dto Genre dto.
   */
  export function fromDto(dto: HttpErrorDto): HttpError {

    const data = dto.data !== undefined ? new ErrorData(dto.data.non_field_errors) : undefined;

    return new HttpError({
      name: dto.name,
      message: dto.message,
      code: Number(dto.code),
      detail: dto.detail,
      data,
    });
  }
}
