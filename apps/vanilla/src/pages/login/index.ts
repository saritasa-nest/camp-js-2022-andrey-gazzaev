import { HttpError } from '@js-camp/core/models/httpError';
import { Tokens } from '@js-camp/core/models/tokens';

import { Login } from '../../constants/classes';
import { Event } from '../../constants/event';
import { FormField } from '../../constants/form';
import { LOCAL_TOKENS } from '../../constants/public';
import { loginUser } from '../../fetches/auth';
import { setLocalStorage } from '../../scripts/localStorage';

/**
 * Get value from input element.
 * @param element The element from which you want to get the value.
 * @returns Value of element or null.
 */
function getValue(element: FormDataEntryValue | null): string | null {
  if (element !== null && element instanceof String) {
    return String(element);
  }
  return null;
}

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

  try {
    const tokens = await loginUser(email, password);

    if (tokens instanceof Tokens) {
      setLocalStorage<Tokens>(LOCAL_TOKENS, tokens);
    }

    location.href = '/';
  } catch (error: unknown) {

    if (error instanceof HttpError) {

      // TO-DO Handle error
      // error.detail;
      // error.code
      // console.log(error.detail);
    }
  }
}

/**
 * Initialization login form.
 */
function initLoginForm(): void {
  const loginForm = document.querySelector<HTMLFormElement>(`.${Login.FORM}`);

  if (loginForm !== null) {
    loginForm.addEventListener(Event.SUBMIT, handleSubmitLoginForm);
  }
}

window.addEventListener(Event.DOM_LOADED, initLoginForm);
