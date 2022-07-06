import axios from 'axios';

import { TokensDto } from '@js-camp/core/dtos/tokens.dto';
import { HttpErrorDto } from '@js-camp/core/dtos/httpError.dto';
import { TokensMapper } from '@js-camp/core/mappers/tokens.mapper';
import { Tokens } from '@js-camp/core/models/tokens';
import { HttpErrorMapper } from '@js-camp/core/mappers/httpError.mapper';

import { defaultRequestInstance } from './instance';

/**
 * Submit a login request.
 * @param email User email.
 * @param password Password user.
 */
export async function loginUser(
  email: string | null,
  password: string | null,
): Promise<Tokens> {
  try {
    const URL_LOGIN = 'auth/login/';

    const response = await defaultRequestInstance.post<TokensDto>(URL_LOGIN, {
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

/**
 * Check if the token is valid.
 * @param access Access token.
 */
export async function checkTokenValidity(access: string): Promise<boolean> {
  try {
    const URL_VERIFY_TOKEN = 'auth/token/verify/';
    await defaultRequestInstance.post<TokensDto>(URL_VERIFY_TOKEN, {
      token: access,
    });

    return true;
  } catch (error: unknown) {

    return false;
  }
}

/**
 * Refresh tokens.
 * @param refresh Refresh token.
 */
export async function getRefreshedToken(refresh: string): Promise<TokensDto> {
  try {
    const URL_REFRESH_TOKEN = 'auth/token/refresh/';
    const response = await defaultRequestInstance.post<TokensDto>(URL_REFRESH_TOKEN, {
      refresh,
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
