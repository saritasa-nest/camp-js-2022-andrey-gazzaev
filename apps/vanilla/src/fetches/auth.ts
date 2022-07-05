import { TokensDto } from '@js-camp/core/dtos/tokens.dto';
import { TokensMapper } from '@js-camp/core/mappers/tokens.mapper';
import { HttpError } from '@js-camp/core/models/httpError';
import { Tokens } from '@js-camp/core/models/tokens';

import { instance } from './instance';

/**
 * Submit a login request.
 * @param email User email.
 * @param password Password user.
 */
export async function loginUser(
  email: string,
  password: string,
): Promise<Tokens | HttpError | Error> {
  try {
    const LOGIN_URL = 'auth/login/';

    const response = await instance.post<TokensDto>(LOGIN_URL, {
      postMessage: {
        email,
        password,
      },
    });

    return TokensMapper.fromDto(response.data);

  } catch (error: unknown) {

    if (error instanceof HttpError) {
      return new HttpError(error.detail, error.code);
    }

    const UNKNOWN_ERROR = 'unexpected error';
    return new Error(UNKNOWN_ERROR);
  }
}
