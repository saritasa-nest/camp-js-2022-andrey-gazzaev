import { LoginDto } from '../dtos/login.dto';
import { Login } from '../models/login';

/** Login data mapper. */
export namespace LoginDataMapper {

  /** @inheritdoc */
  export function toDto(data: Login): LoginDto {
    return data;
  }
}
