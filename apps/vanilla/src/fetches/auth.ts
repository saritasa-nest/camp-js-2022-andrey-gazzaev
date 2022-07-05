import axios from 'axios';

import { TokensDto } from '@js-camp/core/dtos/tokens.dto';
import { HttpErrorDto } from '@js-camp/core/dtos/httpError.dto';
import { TokensMapper } from '@js-camp/core/mappers/tokens.mapper';
import { Tokens } from '@js-camp/core/models/tokens';
import { HttpErrorMapper } from '@js-camp/core/mappers/httpError.mapper';
import { HttpError } from '@js-camp/core/models/httpError';

import { LOCAL_TOKENS } from '../constants/public';
import { getLocalStorage, setLocalStorage } from '../scripts/localStorage';

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
    const URL_LOGIN = 'auth/login/';

    const response = await instance.post<TokensDto>(URL_LOGIN, {
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

/** Check if the token is valid. */
export async function isVerifyToken(): Promise<boolean> {
  try {
    const tokens = getLocalStorage<Tokens>(LOCAL_TOKENS);
    if (tokens === null) {
      return false;
    }

    const URL_VERIFY_TOKEN = 'auth/token/verify/';
    await instance.post<TokensDto>(URL_VERIFY_TOKEN, {
      token: tokens.access,
    });

    return true;
  } catch (error: unknown) {

    return false;
  }
}

/** Refresh tokens. */
export async function refreshToken(): Promise<boolean> {
  try {
    const tokens = getLocalStorage<Tokens>(LOCAL_TOKENS);
    if (tokens === null) {
      return false;
    }

    const URL_REFRESH_TOKEN = 'auth/token/refresh/';
    const response = await instance.post<TokensDto>(URL_REFRESH_TOKEN, {
      refresh: tokens.refresh,
    });

    setLocalStorage(LOCAL_TOKENS, TokensMapper.fromDto(response.data));

    return true;
  } catch (error: unknown) {

    return false;
  }
}
