import { ErrorMessage, FormField } from '../../constants/form';
import { login } from '../../services/domain/user';
import { getValue, goToHomePage, showError } from '../general';

/**
 * Handle login form submit event.
 * @param event Event form.
 */
export function handleSubmitLoginForm(event: SubmitEvent): void {
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
    login({ email, password });

    goToHomePage();
  } catch (error: unknown) {
    if (typeof error === 'string') {
      showError(error);
    }
  }
}
