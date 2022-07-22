import { FormField } from '../../constants/form';
import { loginUser } from '../../services/domain/user';

import { getElementValue, goToHomePage, showError } from '../general';

/**
 * Handles login form submit event.
 * @param event Event form.
 */
export async function handleLoginFormSubmit(event: SubmitEvent): Promise<void> {
  event.preventDefault();

  if (!(event.target instanceof HTMLFormElement)) {
    return;
  }

  const form = new FormData(event.target);

  const email = getElementValue(form.get(FormField.EMAIL));
  const password = getElementValue(form.get(FormField.PASSWORD));

  try {
    await loginUser({ email, password });

    goToHomePage();
  } catch (error: unknown) {
    if (error instanceof Error) {
      showError(error.message);
    }
  }
}
