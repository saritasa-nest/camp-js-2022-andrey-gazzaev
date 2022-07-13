import { Tokens } from '@js-camp/core/models/tokens';
import { User } from '@js-camp/core/models/user';

import { LocalStorageKey } from '../constants/localStorage';

import { checkTokenValidity, getRefreshedToken } from './api/auth';
import { fetchUserProfile } from './api/user';
import { LocalStorageService } from './domain/localStorage';

/** Check if the user is logged in. */
async function isAuthorized(): Promise< boolean> {
  const tokens = LocalStorageService.getValue<Tokens>(LocalStorageKey.TOKENS);
  if (tokens !== null) {
    try {
      const isTokenValid = await checkTokenValidity(tokens.access);
      if (isTokenValid) {
        return true;
      }

      await getRefreshedToken(tokens.refresh);

      return true;
    } catch (error: unknown) {
      LocalStorageService.setValue(LocalStorageKey.TOKENS, null);

      return false;
    }
  }
  return false;
}

/** Changes header depending on the user.*/
export async function getUser(): Promise<User | null> {
  if (await isAuthorized()) {
    return fetchUserProfile();
  }
  return null;
}
