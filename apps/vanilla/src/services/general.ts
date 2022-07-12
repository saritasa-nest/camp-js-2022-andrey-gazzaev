import { Tokens } from '@js-camp/core/models/tokens';
import { User } from '@js-camp/core/models/user';

import { LocalStorageKey } from '../constants/localStorage';

import { checkTokenValidity, getRefreshedToken } from './api/auth';
import { fetchUserProfile } from './api/user';
import { LocalStorageService } from './domain/localStorage';

/**
 * Check if the user is logged in.
 * @param next The function to be executed if the user is logged in.
 */
async function isAuthorization<T>(next: () => Promise<T>): Promise<T | boolean> {
  const tokens = LocalStorageService.getValueFromLocalStorage<Tokens>(LocalStorageKey.TOKENS);
  if (tokens !== null) {
    try {
      const isTokenValid = await checkTokenValidity(tokens.access);
      if (isTokenValid) {
        return await next();
      }

      await getRefreshedToken(tokens.refresh);

      return await next();
    } catch (error: unknown) {
      LocalStorageService.setValueToLocalStorage(LocalStorageKey.TOKENS, null);

      return false;
    }
  }
  return true;
}

/**
 * Changes header depending on the user.
 * @returns Return information about the user if the token is valid,
 * false if the tokens have expired, true if there were no tokens.
 */
export function changeHeader(): Promise<User | boolean> {
  return isAuthorization<User>(() => fetchUserProfile());

}
