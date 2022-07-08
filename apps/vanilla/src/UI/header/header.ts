import { Tokens } from '@js-camp/core/models/tokens';
import { User } from '@js-camp/core/models/user';

import { Form, Header, Profile } from '../../constants/classes';
import { LocalStorageKey } from '../../constants/localStorage';
import { checkTokenValidity, getRefreshedToken } from '../../services/api/auth';
import { fetchUserProfile } from '../../services/api/user';
import { getValueFromLocalStorage, setValueToLocalStorage } from '../../services/domain/localStorage';
import { changeHeader } from '../../services/general';

const USER_PROFILE_TEMPLATE = 'user-profile';
const STANDARD_PROFILE_TEMPLATE = 'standard-profile';
const SIGN_OUT_BUTTON = 'sign-out';

/** Signs out from account. */
function handleSingOut(): void {
  setValueToLocalStorage(LocalStorageKey.TOKENS, null);
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

/** Renders profile header. */
async function renderUserProfile(user: User): Promise<void> {
  try {
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

export async function renderHeader() {
  const user = await changeHeader()

  console.log(user);

  if (user instanceof User) {
    renderUserProfile(user);
  } else if (user) {
    renderStandardProfile();
  } else {
    const URL_LOGIN_PAGE = '/login/';
    location.href = URL_LOGIN_PAGE;
  }

}
