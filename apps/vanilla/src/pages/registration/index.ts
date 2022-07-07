import { HttpError } from '@js-camp/core/models/httpError';
import { Tokens } from '@js-camp/core/models/tokens';
import { User } from '@js-camp/core/models/user';

import { Registration } from '../../constants/classes';
import { ErrorMessage, FormField } from '../../constants/form';
import { LocalStorageKey } from '../../constants/localStorage';
import { registerUser } from '../../fetches/auth';
import { setLocalStorage } from '../../scripts/localStorage';
import { getValue, goToHomePage, showError } from '../../scripts/public';

const DEFAULT_AVATAR_URL =
  'https://s3.us-west-2.amazonaws.com/camp-js-backend-files-dev/' +
  'user_avatars%2Ff33c09a7-a15e-4b7c-b47f-650bfe19faff%2Fprofile.jpg';

/**
 * Handle registration form submit event.
 * @param event Event form.
 */
async function handleSubmitRegistrationForm(event: SubmitEvent): Promise<void> {
  event.preventDefault();

  if (!(event.target instanceof HTMLFormElement)) {
    return;
  }

  const form = new FormData(event.target);

  const email = getValue(form.get(FormField.EMAIL));
  const firstName = getValue(form.get(FormField.FIRST_NAME));
  const lastName = getValue(form.get(FormField.LAST_NAME));
  const password = getValue(form.get(FormField.PASSWORD));
  const confirmedPassword = getValue(form.get(FormField.CONFIRMED_PASSWORD));

  if (
    email === null ||
    firstName === null ||
    lastName === null ||
    password === null ||
    confirmedPassword === null
  ) {
    return showError(ErrorMessage.FIELD_NOT_FILLED);
  }

  if (password.localeCompare(confirmedPassword) !== 0) {
    return showError(ErrorMessage.PASSWORD_NOT_MATCH);
  }

  try {
    const user = new User({
      avatar: DEFAULT_AVATAR_URL,
      firstName,
      lastName,
      email,
    });

    const tokens = await registerUser({ user, password });

    setLocalStorage<Tokens>(LocalStorageKey.TOKENS, tokens);

    goToHomePage();
  } catch (error: unknown) {
    if (error instanceof HttpError) {
      showError(error.detail);
    }
  }
}

/** Initializations registration form. */
function initRegistrationForm(): void {
  const registrationForm = document.querySelector<HTMLFormElement>(`.${Registration.FORM}`);

  if (registrationForm !== null) {
    registrationForm.addEventListener('submit', handleSubmitRegistrationForm);
  }
}

window.addEventListener('DOMContentLoaded', initRegistrationForm);
