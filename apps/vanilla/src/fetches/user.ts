import { UserDto } from '@js-camp/core/dtos/user.dto';
import { User } from '@js-camp/core/models/user';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';

import { FetchHeaders } from '../constants/fetch';

import { defaultRequestInstance } from './instance';
import { generateError } from './error';

const USER_PROFILE_URL = 'users/profile/';

/**
 * Gets user information from the server.
 * @param access Access token.
 */
export async function getUserProfile(access: string): Promise<User> {
  try {
    const response = await defaultRequestInstance.get<UserDto>(USER_PROFILE_URL, {
      headers: {
        [FetchHeaders.Authorization]: `Bearer ${access}`,
      },
    });

    return UserMapper.fromDto(response.data);

  } catch (error: unknown) {
    throw generateError(error);
  }
}
