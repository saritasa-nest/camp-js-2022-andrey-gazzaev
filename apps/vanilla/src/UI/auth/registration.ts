import { User } from '@js-camp/core/models/user';

import { ErrorMessage, FormField } from '../../constants/form';
import { registration } from '../../services/domain/user';

import { getValue, goToHomePage, showError } from '../general';

const DEFAULT_AVATAR_URL =
  'https://s3.us-west-2.amazonaws.com/camp-js-backend-files-dev/' +
  'user_avatars%2Ff33c09a7-a15e-4b7c-b47f-650bfe19faff%2Fprofile.jpg';

/**
 * Handle registration form submit event.
 * @param event Event form.
 */
export function handleSubmitRegistrationForm(event: SubmitEvent): void {
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

  const user = new User({
    avatar: DEFAULT_AVATAR_URL,
    firstName,
    lastName,
    email,
  });

  try {
    registration({ user, password });

    goToHomePage();
  } catch (error: unknown) {
    if (typeof error === 'string') {
      showError(error);
    }
  }
}
