import { LoginData, RegistrationData } from '@js-camp/core/interfaces/auth.interface';
import { HttpError } from '@js-camp/core/models/httpError';
import { Tokens } from '@js-camp/core/models/tokens';

import { LocalStorageKey } from '../../constants/localStorage';
import { loginUser, registerUser } from '../api/auth';

import { LocalStorageService } from './localStorage';

/**
 * Login user.
 * @param loginData Login form data.
 */
export async function login(loginData: LoginData): Promise<void> {
  try {
    const tokens = await loginUser(loginData);

    LocalStorageService.setValueToLocalStorage<Tokens>(LocalStorageKey.TOKENS, tokens);
  } catch (error: unknown) {
    if (error instanceof HttpError) {
      throw error.detail;
    }
  }
}

/**
 * Register user.
 * @param registrationData Registration form data.
 */
export async function registration(registrationData: RegistrationData): Promise<void> {
  try {
    const tokens = await registerUser(registrationData);

    LocalStorageService.setValueToLocalStorage<Tokens>(LocalStorageKey.TOKENS, tokens);
  } catch (error: unknown) {
    if (error instanceof HttpError) {
      throw error.detail;
    }
  }
}
