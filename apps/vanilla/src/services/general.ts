import { Tokens } from '@js-camp/core/models/tokens';
import { User } from '@js-camp/core/models/user';

import { LocalStorageKey } from '../constants/localStorage';

import { isTokenValid } from './api/auth';
import { fetchUserProfile } from './api/user';
import { LocalStorageService } from './domain/localStorage';

/** Checks if the user is logged in. */
async function isAuthorized(): Promise<boolean> {
  const tokens = LocalStorageService.getValue<Tokens>(LocalStorageKey.TOKENS);
  if (tokens !== null) {
    try {
      if (await isTokenValid(tokens.access)) {
        return true;
      }

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

// def get_user(user_id: int) -> Promise[User | None]:
//     """Return user from database by user id.

//     Args:
//         user_id (int): Uniquer Identifier of User

//     Returns:
//         Promise object with User or None if User doesn't exist.

//     """
