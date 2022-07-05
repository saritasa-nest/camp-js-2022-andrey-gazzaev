import { HttpError } from '@js-camp/core/models/httpError';
import { Tokens } from '@js-camp/core/models/tokens';

import { AttributeName } from '../../constants/attribute';
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
function getValueInputElement(element: Element | RadioNodeList | null): string | null {
  if (element !== null && AttributeName.VALUE in element) {
    return element.value;
  }
  return null;
}

/**
 * Handle login form submit event.
 * @param event Event form.
 */
async function handleSubmitLoginForm(event: SubmitEvent): Promise<void> {
  event.preventDefault();

  const form = event.currentTarget as HTMLFormElement;

  const emailItem = form.elements.namedItem(FormField.EMAIL);
  const email = getValueInputElement(emailItem);

  const passwordItem = form.elements.namedItem(FormField.PASSWORD);
  const password = getValueInputElement(passwordItem);

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
