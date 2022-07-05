import axios from 'axios';

import { UserDto } from '@js-camp/core/dtos/user.dto';
import { HttpErrorDto } from '@js-camp/core/dtos/httpError.dto';
import { HttpError } from '@js-camp/core/models/httpError';
import { Tokens } from '@js-camp/core/models/tokens';
import { User } from '@js-camp/core/models/user';
import { HttpErrorMapper } from '@js-camp/core/mappers/httpError.mapper';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';

import { FetchHeaders } from '../constants/fetch';
import { LOCAL_TOKENS } from '../constants/public';
import { getLocalStorage } from '../scripts/localStorage';

import { instance } from './instance';

/** Get user information from the server. */
export async function getUserProfile(): Promise<User | HttpError> {
  try {
    const URL_USER_PROFILE = 'users/profile/';

    const tokens = getLocalStorage<Tokens>(LOCAL_TOKENS);
    if (tokens === null) {
      const UNKNOWN_ERROR = 'no tokens';
      throw new HttpError({ detail: UNKNOWN_ERROR, message: UNKNOWN_ERROR, name: 'Error' });
    }

    const response = await instance.get<UserDto>(URL_USER_PROFILE, {
      headers: {
        [FetchHeaders.Authorization]: `Bearer ${tokens.access}`,
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
    throw new HttpError({ detail: UNKNOWN_ERROR, message: UNKNOWN_ERROR, name: 'Error' });
  }
}
