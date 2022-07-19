import { isDefine } from '@js-camp/core/utils/guards/general.guard';

import { ErrorMessage, FormField } from '../../constants/form';
import { loginUser } from '../../services/domain/user';

import { getElementValue, goToHomePage, showError } from '../general';

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

  const email = getElementValue(form.get(FormField.EMAIL));
  const password = getElementValue(form.get(FormField.PASSWORD));

  if (!isDefine(email) || !isDefine(password)) {
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
