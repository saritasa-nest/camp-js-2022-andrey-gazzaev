import { Tokens } from '@js-camp/core/models/tokens';
import { User } from '@js-camp/core/models/user';

import { LocalStorageKey } from '../constants/localStorage';

import { checkTokenValidity, fetchRefreshedToken } from './api/auth';
import { fetchUserProfile } from './api/user';
import { LocalStorageService } from './domain/localStorage';

/** Checks if the user is logged in. */
async function isAuthorized(): Promise<boolean> {
  const tokens = LocalStorageService.getValue<Tokens>(LocalStorageKey.TOKENS);
  if (tokens !== null) {
    try {
      const isTokenValid = await checkTokenValidity(tokens.access);
      if (isTokenValid) {
        return true;
      }

      LocalStorageService.setValue(LocalStorageKey.TOKENS, await fetchRefreshedToken(tokens.refresh));

      return true;
    } catch (error: unknown) {
      return false;
    }
  }
  return false;
}

/** Gets user information.*/
export async function getUser(): Promise<User | null> {
  if (await isAuthorized()) {
    return fetchUserProfile();
  }
  return null;
}
