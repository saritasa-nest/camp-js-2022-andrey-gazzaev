import { TokensDto } from '@js-camp/core/dtos/tokens.dto';
import { TokensMapper } from '@js-camp/core/mappers/tokens.mapper';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { Tokens } from '@js-camp/core/models/tokens';
import { User } from '@js-camp/core/models/user';

import { generateError } from './error';
import { defaultRequestInstance } from './instance';

interface LoginData {

  /** Email of user. */
  readonly email: string | null;

  /** Password of user. */
  readonly password: string | null;
}

interface RegistrationData {

  /** User information. */
  readonly user: User;

  /** Password of user. */
  readonly password: string;
}

/**
 * Login to user account.
 * @param userInformation  Information required to log in to the user's account.
 */
export async function loginUser(
  userInformation: LoginData,
): Promise<Tokens> {
  try {
    const URL_LOGIN = 'auth/login/';
    const response = await defaultRequestInstance.post<TokensDto>(URL_LOGIN, userInformation);

    return TokensMapper.fromDto(response.data);

  } catch (error: unknown) {
    throw generateError(error);
  }
}

/**
 * Register a user account.
 * @param userInformation Information required to register a user account.
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
    throw generateError(error);
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
    // If an error occurs, it will mean that the token is not valid.
    return false;
  }
}

/**
 * Submit a request to refresh tokens.
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
    throw generateError(error);
  }
}
