import { HttpError } from '@js-camp/core/models/httpError';

import { AttributeName, AttributeValue } from '../constants/attribute';
import { Header } from '../constants/classes';
import { LOCAL_TOKENS } from '../constants/public';
import { isVerifyToken, refreshToken } from '../fetches/auth';
import { getUserProfile } from '../fetches/user';

import { getLocalStorage, setLocalStorage } from './localStorage';

/** Sing out from account. */
function handleSingOut(): void {
  setLocalStorage(LOCAL_TOKENS, null);
  changeHeader();
}

/** Creates a logout button. */
function createSingOutButton(): HTMLButtonElement {
  const button = document.createElement('button');
  button.setAttribute(AttributeName.TYPE, AttributeValue.BUTTON);
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

/** Render profile header. */
async function renderUserProfile(): Promise<void> {
  const user = await getUserProfile();
  if (user instanceof HttpError) {
    return;
  }

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

}

/** Changes header depending on the user. */
export async function changeHeader(): Promise<void> {
  const tokens = getLocalStorage(LOCAL_TOKENS);
  if (tokens !== null) {
    if (await isVerifyToken()) {
      return renderUserProfile();
    }

    const isTokenRefreshed = await refreshToken();

    if (isTokenRefreshed) {
      return renderUserProfile();
    }

    setLocalStorage(LOCAL_TOKENS, null);
    location.href = '/login/';
  } else {
    renderStandardProfile();
  }
}
