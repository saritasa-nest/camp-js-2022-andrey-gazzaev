import { ErrorMessage, FormField } from '../../constants/form';
import { registerUser } from '../../services/domain/user';

import { getValue, goToHomePage, showError } from '../general';

// This is a link to an avatar that has already been uploaded to the server.
const DEFAULT_AVATAR_URL =
  'https://s3.us-west-2.amazonaws.com/camp-js-backend-files-dev/' +
  'user_avatars%2Ff33c09a7-a15e-4b7c-b47f-650bfe19faff%2Fprofile.jpg';

/**
 * Handle registration form submit event.
 * @param event Event form.
 */
export async function handleSubmitRegistrationForm(event: SubmitEvent): Promise<void> {
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
    await registerUser({
      user: {
        avatar: DEFAULT_AVATAR_URL,
        firstName,
        lastName,
        email,
      },
      password,
    });

    goToHomePage();
  } catch (error: unknown) {
    if (error instanceof Error) {
      showError(error.message);
    }
  }
}
