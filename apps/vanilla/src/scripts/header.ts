import { HttpError } from '@js-camp/core/models/httpError';
import { Tokens } from '@js-camp/core/models/tokens';

import { Header } from '../constants/classes';
import { LocalStorageKeys } from '../constants/localStorage';
import { checkTokenValidity, getRefreshedToken } from '../fetches/auth';
import { getUserProfile } from '../fetches/user';

import { getLocalStorage, setLocalStorage } from './localStorage';

/** Sing out from account. */
function handleSingOut(): void {
  setLocalStorage(LocalStorageKeys.TOKENS, null);
  changeHeader();
}

/** Creates a logout button. */
function createSingOutButton(): HTMLButtonElement {
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.innerHTML = 'Sing out';
  button.addEventListener('click', handleSingOut);
  return button;
}

/**
 * Adds profile element to header.
 * @param element Profile element.
 */
function addProfileToHeader(element: Element | Node | null): void {
  const headerElement = document.querySelector(`.${Header.PROFILE}`);
  if (headerElement !== null && element !== null) {
    headerElement.innerHTML = '';
    headerElement.append(element);
  }
}

/** Render standard header template. */
function renderStandardProfile(): void {
  const ID_STANDARD_PROFILE_TEMPLATE = '#standard-profile';
  const standardTemplate = document.querySelector<HTMLTemplateElement>(ID_STANDARD_PROFILE_TEMPLATE);
  if (standardTemplate !== null) {
    const standardElement = standardTemplate.content.cloneNode(true);
    addProfileToHeader(standardElement);
  }
}

/**
 * Render profile header.
 * @param access Access token.
 */
async function renderUserProfile(access: string): Promise<void> {
  try {
    const user = await getUserProfile(access);

    const ID_USER_PROFILE_TEMPLATE = '#user-profile';
    const profileTemplate = document.querySelector<HTMLTemplateElement>(ID_USER_PROFILE_TEMPLATE);

    const userGreeting = document.createElement('p');
    userGreeting.innerHTML = `Hello, ${user.firstName} ${user.lastName} !!!`;

    const singOutButton = createSingOutButton();

    if (profileTemplate !== null) {
      const profileElement = profileTemplate.content.cloneNode(true);
      profileElement.appendChild(userGreeting);
      profileElement.appendChild(singOutButton);
      addProfileToHeader(profileElement);
    }
  } catch (error: unknown) {
    if (error instanceof HttpError) {

      // console.log(error);

      // TO-DO Handle error
      // error.detail;
      // error.code
      // console.log(error.detail);
    }
  }

}

/** Changes header depending on the user. */
export async function changeHeader(): Promise<void> {
  const tokens = getLocalStorage<Tokens>(LocalStorageKeys.TOKENS);
  if (tokens !== null) {
    const isTokenValid = await checkTokenValidity(tokens.access);
    if (isTokenValid) {
      return renderUserProfile(tokens.access);
    }

    try {
      const refreshedTokens = await getRefreshedToken(tokens.refresh);

      renderUserProfile(refreshedTokens.access);

    } catch (error: unknown) {
      setLocalStorage(LocalStorageKeys.TOKENS, null);

      location.href = '/login/';
    }
  } else {
    renderStandardProfile();
  }
}
