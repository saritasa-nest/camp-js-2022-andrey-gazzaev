import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { LoginDataMapper } from '@js-camp/core/mappers/login-data.mapper';
import { RegistrationDataMapper } from '@js-camp/core/mappers/registration-data.mapper';
import { TokensMapper } from '@js-camp/core/mappers/token.mapper';
import { FormError } from '@js-camp/core/models/form-error';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';
import { Token } from '@js-camp/core/models/token';

import { generateError, http } from '..';
import { CONFIG } from '../config';

import { TokenService } from './tokenService';

export namespace AuthService {
  const S3_URL = 'https://s3.us-west-2.amazonaws.com/camp-js-backend-files-dev/';
  const FILE_PATH_TO_AVATAR = 'user_avatars%2Ff33c09a7-a15e-4b7c-b47f-650bfe19faff%2Fprofile.jpg';

  const LOGIN_URL = new URL('auth/login/', CONFIG.apiUrl);
  const REGISTRATION_URL = new URL('auth/register/', CONFIG.apiUrl);
  const REFRESH_URL = new URL('auth/token/refresh/', CONFIG.apiUrl);

  /**
   * Log in to account.
   * @param loginData Data required for login..
   */
  export async function login(loginData: Login): Promise<Token> {
    try {
      const loginDataDto = LoginDataMapper.toDto(loginData);
      const tokenDto = (await http.post<TokenDto>(LOGIN_URL.toString(), loginDataDto)).data;
      const token = TokensMapper.fromDto(tokenDto);
      await TokenService.save(token);
      return token;
    } catch (error: unknown) {
      const loginError = generateError<FormError<Login>>(error);
      if (loginError !== null) {
        throw loginError;
      }
      throw error;
    }
  }

  /**
   * Registers an account.
   * @param registrationData Data required for registration.
   */
  export async function register(registrationData: Registration) {
    const avatarUrl = `${S3_URL}${FILE_PATH_TO_AVATAR}`;

    try {
      const registrationDataDto = RegistrationDataMapper.toDto({ ...registrationData, avatarUrl });
      const tokenDto = (await http.post<TokenDto>(REGISTRATION_URL.toString(), registrationDataDto)).data;
      const token = TokensMapper.fromDto(tokenDto);
      await TokenService.save(token);
      return token;
    } catch (error: unknown) {
      const registrationError = generateError<FormError<Registration>>(error);
      if (registrationError !== null) {
        throw registrationError;
      }
      throw error;
    }
  }

  /**
   * Refreshes access token.
   * @param token Token object.
   */
  export async function refreshToken({ refresh }: Token): Promise<Token> {
    const tokenDto = (await http.post<TokenDto>(REFRESH_URL.toString(), { refresh })).data;
    return TokensMapper.fromDto(tokenDto);
  }
}
