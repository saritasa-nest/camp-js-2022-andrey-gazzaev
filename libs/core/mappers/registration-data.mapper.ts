/* eslint-disable @typescript-eslint/naming-convention */
import { RegistrationDto } from '../dtos/registration.dto';
import { Registration } from '../models/registration';

/** Registration data mapper. */
export namespace RegistrationDataMapper {

  /**
   * Map model to dto.
   * @param model Registration model.
   */
  export function toDto({ email, firstName, lastName, password, avatarUrl }: Registration): RegistrationDto {
    return {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      avatar: avatarUrl,
    };
  }
}
