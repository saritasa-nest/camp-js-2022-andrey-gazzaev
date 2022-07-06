import axios from 'axios';

import { TokensDto } from '@js-camp/core/dtos/tokens.dto';
import { HttpErrorDto } from '@js-camp/core/dtos/httpError.dto';
import { TokensMapper } from '@js-camp/core/mappers/tokens.mapper';
import { HttpErrorMapper } from '@js-camp/core/mappers/httpError.mapper';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { Tokens } from '@js-camp/core/models/tokens';
import { User } from '@js-camp/core/models/user';

import { defaultRequestInstance } from './instance';

interface LoginData {

  /** Email of user. */
  readonly email: string | null;

  /** Password of user. */
  readonly password: string | null;
}

interface RegistrationData {

  /** Email of user. */
  readonly user: User;

  /** Password of user. */
  readonly password: string;
}

/**
 * Submit a login request.
 * @param param0 Information required to log in to the user's account.
 */
export async function loginUser(
  { email, password }: LoginData,
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
 * Register user.
 * @param param0 Information required to register a user account.
 */
export async function registerUser({ user, password }: RegistrationData): Promise<Tokens> {
  try {
    const URL_REGISTER = 'auth/register/';

    const userDto = UserMapper.toDto(user, password);
    const response = await defaultRequestInstance.post<TokensDto>(URL_REGISTER, {
      ...userDto,
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
