import { Login } from '../../constants/classes';
import { handleLoginFormSubmit } from '../../UI/auth/login';
import { getDomElement } from '../../UI/general';

/** Initializations login form. */
function initLoginForm(): void {
  const loginForm = getDomElement<HTMLFormElement>(document, `.${Login.FORM}`);
  loginForm.addEventListener('submit', handleLoginFormSubmit);
}

window.addEventListener('DOMContentLoaded', initLoginForm);
