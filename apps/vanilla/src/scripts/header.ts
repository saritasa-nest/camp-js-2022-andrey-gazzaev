import { HttpError } from '@js-camp/core/models/httpError';

import { LOCAL_TOKENS } from '../constants/public';
import { isVerifyToken, refreshToken } from '../fetches/auth';
import { getUserProfile } from '../fetches/user';

import { getLocalStorage, setLocalStorage } from './localStorage';

function renderProfile(element: Element | null | Node) {
  const headerElement = document.querySelector(`.profile`);
  if (headerElement !== null && element !== null) {
    headerElement.innerHTML = '';
    headerElement.append(element);
  }
}

function renderStandardElement() {
  const standardElement = document.querySelector<HTMLTemplateElement>(`#standart-profile`);
  if (standardElement !== null) {
    renderProfile(standardElement.content.cloneNode(true));
  }
}

async function renderProfileElement() {
  const user = await getUserProfile();
  if (user instanceof HttpError) {
    return;
  }

  const userElement = document.createElement(`div`);

  const profileElement = document.createElement('p');
  profileElement.innerHTML = `Hello, ${user.firstName} ${user.lastName} !!!`;

  const singOutElement = document.createElement('button');
  singOutElement.setAttribute('type', 'button');
  singOutElement.innerHTML = 'Sing out';
  singOutElement.addEventListener('click', () => {
    setLocalStorage(LOCAL_TOKENS, null);
    changeHeader();
  });
  userElement?.append(profileElement, singOutElement);

  renderProfile(userElement);
}

export async function changeHeader() {
  const tokens = getLocalStorage(LOCAL_TOKENS);
  if (tokens !== null) {
    if (await isVerifyToken()) {

      return renderProfileElement();
    }

    const isTokenRefreshed = await refreshToken();

    if (isTokenRefreshed) {
      return renderProfileElement();
    }

    setLocalStorage(LOCAL_TOKENS, null);
    location.href = '/login/';
  } else {
    renderStandardElement();
  }
}
