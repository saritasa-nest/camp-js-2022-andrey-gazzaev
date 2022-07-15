import { LoginData, RegistrationData } from '@js-camp/core/utils/interfaces/auth.interface';
import { HttpError } from '@js-camp/core/models/httpError';
import { Tokens } from '@js-camp/core/models/tokens';

import { LocalStorageKey } from '../../constants/localStorage';
import { login, register } from '../api/auth';

import { LocalStorageService } from './localStorage';

/**
 * Login user.
 * @param loginData Login form data.
 */
export async function loginUser(loginData: LoginData): Promise<void> {
  try {
    const tokens = await login(loginData);

    LocalStorageService.setValue<Tokens>(LocalStorageKey.TOKENS, tokens);
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
export async function registerUser(registrationData: RegistrationData): Promise<void> {
  try {
    const tokens = await register(registrationData);

    LocalStorageService.setValue<Tokens>(LocalStorageKey.TOKENS, tokens);
  } catch (error: unknown) {
    if (error instanceof HttpError) {
      throw error.detail;
    }
  }
}

/** Sign out. */
export function signOut(): void {
  LocalStorageService.setValue(LocalStorageKey.TOKENS, null);
}
