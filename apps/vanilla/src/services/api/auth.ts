import { TokensDto } from '@js-camp/core/dtos/tokens.dto';
import { TokensMapper } from '@js-camp/core/mappers/tokens.mapper';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { Tokens } from '@js-camp/core/models/tokens';
import { User } from '@js-camp/core/models/user';

import { defaultRequestInstance } from './instance';

/** Data necessary for login. */
interface LoginData {

  /** Email of user. */
  readonly email: string;

  /** Password of user. */
  readonly password: string;
}

/** Data necessary for register. */
interface RegistrationData {

  /** User information. */
  readonly user: User;

  /** Password of user. */
  readonly password: string;
}

const LOGIN_URL = 'auth/login/';
const REGISTER_URL = 'auth/register/';
const VERIFY_TOKEN_URL = 'auth/token/verify/';
const REFRESH_TOKEN_URL = 'auth/token/refresh/';

/**
 * Login to user account.
 * @param userInformation Information required to log in to the user's account.
 */
export async function loginUser(
  userInformation: LoginData,
): Promise<Tokens> {
  const response = await defaultRequestInstance.post<TokensDto>(LOGIN_URL, userInformation);

  return TokensMapper.fromDto(response.data);
}

/**
 * Registers a user account.
 * @param userInformation Information required to register a user account.
 */
export async function registerUser({ user, password }: RegistrationData): Promise<Tokens> {
  const userDto = UserMapper.toDto(user, password);
  const response = await defaultRequestInstance.post<TokensDto>(REGISTER_URL, {
    ...userDto,
  });

  return TokensMapper.fromDto(response.data);
}

/**
 * Checks if the token is valid.
 * @param accessToken Access token.
 */
export async function checkTokenValidity(accessToken: string): Promise<boolean> {
  try {
    await defaultRequestInstance.post<TokensDto>(VERIFY_TOKEN_URL, {
      token: accessToken,
    });

    return true;
  } catch (error: unknown) {
    // If an error occurs, it will mean that the token is not valid.
    return false;
  }
}

/**
 * Submits a request to refresh tokens.
 * @param refreshToken Refresh token.
 */
export async function getRefreshedToken(refreshToken: string): Promise<TokensDto> {
  const response = await defaultRequestInstance.post<TokensDto>(REFRESH_TOKEN_URL, {
    refresh: refreshToken,
  });

  return TokensMapper.fromDto(response.data);
}
