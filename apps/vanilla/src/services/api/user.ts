import { UserDto } from '@js-camp/core/dtos/user.dto';
import { User } from '@js-camp/core/models/user';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';

import { defaultRequestInstance } from './instance';

const USER_PROFILE_URL = 'users/profile/';

/** Gets user information from the server. */
export async function fetchUserProfile(): Promise<User> {
  const response = await defaultRequestInstance.get<UserDto>(USER_PROFILE_URL);

  return UserMapper.fromDto(response.data);
}
