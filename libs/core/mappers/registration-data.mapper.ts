/* eslint-disable @typescript-eslint/naming-convention */
import { RegistrationDto } from '../dtos/registration.dto';
import { Registration } from '../models/registration';

/** Registration data mapper. */
export namespace RegistrationDataMapper {

  /**
   * Map model to dto.
   * @param model Registration model.
   */
  export function toDto({ email, firstName, lastName, password }: Registration): RegistrationDto {
    const avatar =
      'https://s3.us-west-2.amazonaws.com/camp-js-backend-files-dev/' +
      'user_avatars%2Ff33c09a7-a15e-4b7c-b47f-650bfe19faff%2Fprofile.jpg';

    return {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      avatar,
    };
  }
}
