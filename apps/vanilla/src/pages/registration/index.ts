import { Registration } from '../../constants/classes';
import { handleRegistrationFormSubmit } from '../../UI/auth/registration';
import { getDomElement } from '../../UI/general';

/** Initializations registration form. */
function initRegistrationForm(): void {
  const registrationForm = getDomElement<HTMLFormElement>(`.${Registration.FORM}`);
  registrationForm.addEventListener('submit', handleRegistrationFormSubmit);
}

window.addEventListener('DOMContentLoaded', initRegistrationForm);
