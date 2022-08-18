import { UserDto } from '@js-camp/core/dtos/user.dto';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { User } from '@js-camp/core/models/user';

import { http } from '..';
import { CONFIG } from '../config';

export namespace UserService {

  const userUrl = new URL(`users/profile/`, CONFIG.apiUrl);

  /** Fetches user. */
  export async function fetchUser(): Promise<User> {
    try {
      const userDto = (await http.get<UserDto>(userUrl.toString())).data;
      const user = UserMapper.fromDto(userDto);
      return user;
    } catch (error: unknown) {
      throw error;
    }
  }
}
