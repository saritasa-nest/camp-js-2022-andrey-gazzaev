import { LoginData, RegistrationData } from '@js-camp/core/utils/interfaces/auth.interface';
import { AppError } from '@js-camp/core/models/app-error1';

import { LocalStorageKey } from '../../constants/localStorage';
import { login, register } from '../api/auth';

import { LocalStorageService } from './localStorage';
import { TokenService } from './token';

/**
 * Login user.
 * @param loginData Login form data.
 */
export async function loginUser(loginData: LoginData): Promise<void> {
  try {
    const tokens = await login(loginData);

    TokenService.setTokens(tokens);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      throw error;
    }
  }
}

/**
 * Register user.
 * @param registrationData Registration form data.
 */
export async function registerUser(registrationData: RegistrationData): Promise<void> {
  try {
    const tokens = await register(registrationData);

    TokenService.setTokens(tokens);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      throw error;
    }
  }
}

/** Sign out. */
export function signOut(): void {
  LocalStorageService.setValue(LocalStorageKey.TOKENS, null);
}
