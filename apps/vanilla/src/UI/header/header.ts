import { User } from '@js-camp/core/models/user';

import { Form, Header, Profile } from '../../constants/classes';
import { TokenService } from '../../services/domain/token';
import { signOut } from '../../services/domain/user';
import { getUser } from '../../services/general';

const USER_PROFILE_TEMPLATE = 'user-profile';
const STANDARD_PROFILE_TEMPLATE = 'standard-profile';
const SIGN_OUT_BUTTON = 'sign-out';

/** Signs out from account. */
function handleSignOut(): void {
  signOut();
  renderHeader();
}

/** Creates a logout button. */
function createSignOutButton(): HTMLButtonElement {
  const button = document.createElement('button');
  button.innerHTML = 'Sign out';
  button.classList.add(SIGN_OUT_BUTTON, Form.BUTTON);
  button.setAttribute('type', 'button');
  button.addEventListener('click', handleSignOut);
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
 * @param user Information about user.
 */
function renderUserProfile(user: User): void {
  const profileTemplate = document.querySelector<HTMLTemplateElement>(`.${USER_PROFILE_TEMPLATE}`);
  if (profileTemplate !== null) {
    const userGreeting = document.createElement('span');
    userGreeting.innerHTML = `Hello, ${user.firstName} ${user.lastName}!`;
    userGreeting.classList.add(Profile.NAME);

    const signOutButton = createSignOutButton();
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
}

/** Renders header. */
export async function renderHeader(): Promise<void> {
  const user = await getUser();
  if (user !== null) {
    renderUserProfile(user);
  } else if (!TokenService.isTokens()) {
    renderStandardProfile();
  }
}
