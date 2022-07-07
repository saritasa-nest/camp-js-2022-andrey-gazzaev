import { HttpError } from '@js-camp/core/models/httpError';
import { Tokens } from '@js-camp/core/models/tokens';

import { Login } from '../../constants/classes';
import { ErrorMessage, FormField } from '../../constants/form';
import { LocalStorageKey } from '../../constants/localStorage';
import { loginUser } from '../../fetches/auth';
import { setLocalStorage } from '../../scripts/localStorage';
import { getValue, goToHomePage, showError } from '../../scripts/public';

/**
 * Handle login form submit event.
 * @param event Event form.
 */
async function handleSubmitLoginForm(event: SubmitEvent): Promise<void> {
  event.preventDefault();

  if (!(event.target instanceof HTMLFormElement)) {
    return;
  }

  const form = new FormData(event.target);

  const email = getValue(form.get(FormField.EMAIL));
  const password = getValue(form.get(FormField.PASSWORD));

  if (email === null || password === null) {
    return showError(ErrorMessage.FIELD_NOT_FILLED);
  }

  try {
    const tokens = await loginUser({ email, password });

    setLocalStorage<Tokens>(LocalStorageKey.TOKENS, tokens);

    goToHomePage();
  } catch (error: unknown) {
    if (error instanceof HttpError) {
      showError(error.detail);
    }
  }
}

/** Initializations login form. */
function initLoginForm(): void {
  const loginForm = document.querySelector<HTMLFormElement>(`.${Login.FORM}`);

  if (loginForm !== null) {
    loginForm.addEventListener('submit', handleSubmitLoginForm);
  }
}

window.addEventListener('DOMContentLoaded', initLoginForm);
