import { Tokens } from '@js-camp/core/models/tokens';
import { User } from '@js-camp/core/models/user';

import { LocalStorageKey } from '../constants/localStorage';

import { checkTokenValidity, getRefreshedToken } from './api/auth';
import { fetchUserProfile } from './api/user';
import { getValueFromLocalStorage, setValueToLocalStorage } from './domain/localStorage';

/** Changes header depending on the user. */
export async function changeHeader(): Promise<User | boolean> {
  const tokens = getValueFromLocalStorage<Tokens>(LocalStorageKey.TOKENS);
  if (tokens !== null) {
    try {
      const isTokenValid = await checkTokenValidity(tokens.access);
      if (isTokenValid) {
        return await fetchUserProfile();
      }

      await getRefreshedToken(tokens.refresh);

      return await fetchUserProfile();
    } catch (error: unknown) {
      setValueToLocalStorage(LocalStorageKey.TOKENS, null);

      return false;
    }
  }
  return true;
}
