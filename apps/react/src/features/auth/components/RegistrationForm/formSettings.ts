import * as yup from 'yup';

/** Form data for registration. */
export interface RegistrationFormData {

  /** First name. */
  readonly firstName: string;

  /** Last name. */
  readonly lastName: string;

  /** Email. */
  readonly email: string;

  /** Password.  */
  readonly password: string;

  /** Password confirm. */
  readonly passwordConfirm: string;
}

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$/i;

const FIRST_NAME_ERROR_MESSAGE = 'First name is required';
const LAST_NAME_ERROR_MESSAGE = 'Last name is required';
const EMAIL_ERROR_MESSAGES = {
  email: 'Enter a valid email',
  required: 'Email is required',
};
const PASSWORD_ERROR_MESSAGES = {
  min: 'Password should be of minimum 8 characters length',
  matches: 'Password must be at least 1 lowercase character, at least 1 uppercase character and at least 1 digit',
  required: 'Password is required',
};
const PASSWORD_CONFIRM_ERROR_MESSAGES = {
  oneOf: 'Passwords must match',
  required: 'Password confirm is required',
};

export const signUpSchema: yup.SchemaOf<RegistrationFormData> = yup.object({
  firstName: yup.string().required(FIRST_NAME_ERROR_MESSAGE),
  lastName: yup.string().required(LAST_NAME_ERROR_MESSAGE),
  email: yup
    .string()
    .email(EMAIL_ERROR_MESSAGES.email)
    .required(EMAIL_ERROR_MESSAGES.required),
  password: yup
    .string()
    .min(8, PASSWORD_ERROR_MESSAGES.min)
    .matches(passwordPattern, PASSWORD_ERROR_MESSAGES.matches)
    .required(PASSWORD_ERROR_MESSAGES.required),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], PASSWORD_CONFIRM_ERROR_MESSAGES.oneOf)
    .required(PASSWORD_CONFIRM_ERROR_MESSAGES.required),
});
