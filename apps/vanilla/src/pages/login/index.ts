import { Login } from '../../constants/classes';
import { handleSubmitLoginForm } from '../../UI/auth/login';
import { getDomElement } from '../../UI/general';

/** Initializations login form. */
function initLoginForm(): void {
  const loginForm = getDomElement<HTMLFormElement>(document, `.${Login.FORM}`);
  loginForm.addEventListener('submit', handleSubmitLoginForm);
}

window.addEventListener('DOMContentLoaded', initLoginForm);
