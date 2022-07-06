import axios from 'axios';

import { UserDto } from '@js-camp/core/dtos/user.dto';
import { HttpErrorDto } from '@js-camp/core/dtos/httpError.dto';
import { HttpError } from '@js-camp/core/models/httpError';
import { User } from '@js-camp/core/models/user';
import { HttpErrorMapper } from '@js-camp/core/mappers/httpError.mapper';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';

import { FetchHeaders } from '../constants/fetch';

import { defaultRequestInstance } from './instance';

/**
 * Get user information from the server.
 * @param access Access token.
 */
export async function getUserProfile(access: string): Promise<User> {
  try {
    const URL_USER_PROFILE = 'users/profile/';

    const response = await defaultRequestInstance.get<UserDto>(URL_USER_PROFILE, {
      headers: {
        [FetchHeaders.Authorization]: `Bearer ${access}`,
      },
    });

    return UserMapper.fromDto(response.data);

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response !== undefined) {
        const httpError = HttpErrorMapper.fromDto(error.response.data as HttpErrorDto);

        throw httpError;
      }
    }

    const UNKNOWN_ERROR = 'unexpected error';
    throw new HttpError(UNKNOWN_ERROR);
  }
}
