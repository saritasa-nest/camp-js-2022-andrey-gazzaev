import { ErrorMessage, FormField } from '../../constants/form';
import { loginUser } from '../../services/domain/user';

import { getValue, goToHomePage, showError } from '../general';

/**
 * Handle login form submit event.
 * @param event Event form.
 */
export async function handleSubmitLoginForm(event: SubmitEvent): Promise<void> {
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
    await loginUser({ email, password });

    goToHomePage();
  } catch (error: unknown) {
    if (error instanceof Error) {
      showError(error.message);
    }
  }
}
