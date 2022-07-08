import { HttpError } from '@js-camp/core/models/httpError';
import { Tokens } from '@js-camp/core/models/tokens';

import { ErrorMessage, FormField } from '../../constants/form';
import { LocalStorageKey } from '../../constants/localStorage';
import { loginUser } from '../../services/api/auth';
import { setValueToLocalStorage } from '../../services/domain/localStorage';
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
    const tokens = await loginUser({ email, password });

    setValueToLocalStorage<Tokens>(LocalStorageKey.TOKENS, tokens);

    goToHomePage();
  } catch (error: unknown) {
    if (error instanceof HttpError) {
      showError(error.detail);
    }
  }
}
