import { Login } from '../../constants/classes';
import { handleSubmitLoginForm } from '../../UI/auth/login';

/** Initializations login form. */
function initLoginForm(): void {
  const loginForm = document.querySelector<HTMLFormElement>(`.${Login.FORM}`);

  if (loginForm !== null) {
    loginForm.addEventListener('submit', handleSubmitLoginForm);
  }
}

window.addEventListener('DOMContentLoaded', initLoginForm);
