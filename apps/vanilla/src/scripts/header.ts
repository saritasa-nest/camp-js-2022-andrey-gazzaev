import { Tokens } from '@js-camp/core/models/tokens';

import { Form, Header, Profile } from '../constants/classes';
import { LocalStorageKey } from '../constants/localStorage';
import { checkTokenValidity, getRefreshedToken } from '../fetches/auth';
import { getUserProfile } from '../fetches/user';

import { getLocalStorage, setLocalStorage } from './localStorage';

const USER_PROFILE_TEMPLATE = 'user-profile';
const STANDARD_PROFILE_TEMPLATE = 'standard-profile';
const SIGN_OUT_BUTTON = 'sign-out';

/** Signs out from account. */
function handleSingOut(): void {
  setLocalStorage(LocalStorageKey.TOKENS, null);
  changeHeader();
}

/** Creates a logout button. */
function createSingOutButton(): HTMLButtonElement {
  const button = document.createElement('button');
  button.innerHTML = 'Sign out';
  button.classList.add(SIGN_OUT_BUTTON, Form.BUTTON);
  button.setAttribute('type', 'button');
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

/** Renders standard header template. */
function renderStandardProfile(): void {
  const standardTemplate = document.querySelector<HTMLTemplateElement>(`.${STANDARD_PROFILE_TEMPLATE}`);
  if (standardTemplate !== null) {
    const standardElement = standardTemplate.content.cloneNode(true);
    addProfileToHeader(standardElement);
  }
}

/**
 * Renders profile header.
 * @param access Access token.
 */
async function renderUserProfile(access: string): Promise<void> {
  try {
    const user = await getUserProfile(access);

    const profileTemplate = document.querySelector<HTMLTemplateElement>(`.${USER_PROFILE_TEMPLATE}`);
    if (profileTemplate !== null) {
      const userGreeting = document.createElement('span');
      userGreeting.innerHTML = `Hello, ${user.firstName} ${user.lastName}!`;
      userGreeting.classList.add(Profile.NAME);

      const signOutButton = createSingOutButton();
      const profileElement = profileTemplate.content.cloneNode(true);

      if (!(profileElement instanceof DocumentFragment)) {
        return renderStandardProfile();
      }

      const form = profileElement.querySelector(`.${Profile.FORM}`);

      if (form === null) {
        return renderStandardProfile();
      }

      form.append(userGreeting, signOutButton);
      addProfileToHeader(profileElement);
    }
  } catch (error: unknown) {
    renderStandardProfile();
  }

}

/** Changes header depending on the user. */
export async function changeHeader(): Promise<void> {
  const tokens = getLocalStorage<Tokens>(LocalStorageKey.TOKENS);
  if (tokens !== null) {
    const isTokenValid = await checkTokenValidity(tokens.access);
    if (isTokenValid) {
      return renderUserProfile(tokens.access);
    }

    try {
      const refreshedTokens = await getRefreshedToken(tokens.refresh);
      renderUserProfile(refreshedTokens.access);

    } catch (error: unknown) {
      setLocalStorage(LocalStorageKey.TOKENS, null);

      const URL_LOGIN_PAGE = '/login/';
      location.href = URL_LOGIN_PAGE;
    }
  } else {
    renderStandardProfile();
  }
}
