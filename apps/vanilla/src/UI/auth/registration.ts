import { isDefined } from '@js-camp/core/utils/guards/general.guard';

import { ErrorMessage, FormField } from '../../constants/form';
import { registerUser } from '../../services/domain/user';

import { getElementValue, goToHomePage, showError } from '../general';

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

  const email = getElementValue(form.get(FormField.EMAIL));
  const firstName = getElementValue(form.get(FormField.FIRST_NAME));
  const lastName = getElementValue(form.get(FormField.LAST_NAME));
  const password = getElementValue(form.get(FormField.PASSWORD));
  const confirmedPassword = getElementValue(form.get(FormField.CONFIRMED_PASSWORD));

  if (
    !isDefined(email) ||
    !isDefined(firstName) ||
    !isDefined(lastName) ||
    !isDefined(password) ||
    !isDefined(confirmedPassword)
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
