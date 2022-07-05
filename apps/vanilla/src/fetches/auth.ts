import axios from 'axios';

import { TokensDto } from '@js-camp/core/dtos/tokens.dto';
import { HttpErrorDto } from '@js-camp/core/dtos/httpError.dto';
import { TokensMapper } from '@js-camp/core/mappers/tokens.mapper';
import { Tokens } from '@js-camp/core/models/tokens';
import { HttpErrorMapper } from '@js-camp/core/mappers/httpError.mapper';
import { HttpError } from '@js-camp/core/models/httpError';

import { instance } from './instance';

/**
 * Submit a login request.
 * @param email User email.
 * @param password Password user.
 */
export async function loginUser(
  email: string | null,
  password: string | null,
): Promise<Tokens | HttpError | Error> {
  try {
    const LOGIN_URL = 'auth/login/';

    const response = await instance.post<TokensDto>(LOGIN_URL, {
      email,
      password,
    });

    return TokensMapper.fromDto(response.data);

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response !== undefined) {
        const httpError = HttpErrorMapper.fromDto(error.response.data as HttpErrorDto);

        throw httpError;
      }
    }

    const UNKNOWN_ERROR = 'unexpected error';
    throw new Error(UNKNOWN_ERROR);
  }
}
