import { LOCAL_TOKENS } from '../constants/public';

import { getLocalStorage } from './localStorage';

function isTokenVerify(access: string): boolean {

  return false;
}

function changeHeader() {
  const tokens = getLocalStorage(LOCAL_TOKENS);
  if (tokens !== null) {
    if (isTokenVerify()) {
      // TO-DO get user info
      // create user profile in header
      // create button "sing out"
    } else {
      // TO-DO request for new token or render standard header
    }

  }
}
