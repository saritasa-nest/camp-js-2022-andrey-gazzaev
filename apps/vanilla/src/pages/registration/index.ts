import { Registration } from '../../constants/classes';
import { handleSubmitRegistrationForm } from '../../UI/auth/registration';

/** Initializations registration form. */
function initRegistrationForm(): void {
  const registrationForm = document.querySelector<HTMLFormElement>(`.${Registration.FORM}`);

  if (registrationForm !== null) {
    registrationForm.addEventListener('submit', handleSubmitRegistrationForm);
  }
}

window.addEventListener('DOMContentLoaded', initRegistrationForm);
