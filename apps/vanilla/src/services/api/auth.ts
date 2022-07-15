import { TokensDto } from '@js-camp/core/dtos/tokens.dto';
import { LoginData, RegistrationData } from '@js-camp/core/utils/interfaces/auth.interface';
import { TokensMapper } from '@js-camp/core/mappers/tokens.mapper';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { Tokens } from '@js-camp/core/models/tokens';
import { User } from '@js-camp/core/models/user';

import { defaultRequestInstance } from './instance';

const LOGIN_URL = 'auth/login/';
const REGISTER_URL = 'auth/register/';
const VERIFY_TOKEN_URL = 'auth/token/verify/';
const REFRESH_TOKEN_URL = 'auth/token/refresh/';

/**
 * Login to user account.
 * @param loginData Information required to log in to the user's account.
 */
export async function login(
  loginData: LoginData,
): Promise<Tokens> {
  const response = await defaultRequestInstance.post<TokensDto>(LOGIN_URL, loginData);

  return TokensMapper.fromDto(response.data);
}

/**
 * Registers a user account.
 * @param registrationData Information required to register a user account.
 */
export async function register({ user, password }: RegistrationData): Promise<Tokens> {
  const userModel = new User(user);
  const userDto = UserMapper.toDto(userModel, password);
  const response = await defaultRequestInstance.post<TokensDto>(REGISTER_URL, {
    ...userDto,
  });

  return TokensMapper.fromDto(response.data);
}

/**
 * Checks if the token is valid.
 * @param accessToken Access token.
 */
export async function isTokenValid(accessToken: string): Promise<boolean> {
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
export async function fetchRefreshToken(refreshToken: string): Promise<Tokens> {
  const response = await defaultRequestInstance.post<TokensDto>(REFRESH_TOKEN_URL, {
    refresh: refreshToken,
  });

  return TokensMapper.fromDto(response.data);
}
