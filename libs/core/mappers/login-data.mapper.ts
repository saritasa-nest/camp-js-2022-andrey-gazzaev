import { LoginDto } from '../dtos/login.dto';
import { Login } from '../models/login';

/** Login data mapper. */
export namespace LoginDataMapper {

  /**
   * Map model to dto.
   * @param model Login model.
   */
  export function toDto(model: Login): LoginDto {
    return {
      email: model.email,
      password: model.password,
    };
  }
}
