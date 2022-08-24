import * as yup from 'yup';

/** Form data for login. */
export interface LoginFormData {

  /** Email. */
  readonly email: string;

  /** Password.  */
  readonly password: string;
}

const EMAIL_ERROR_MESSAGE = 'Email is required';
const PASSWORD_ERROR_MESSAGE = 'Password is required';

export const signInSchema: yup.SchemaOf<LoginFormData> = yup.object({
  email: yup
    .string()
    .required(EMAIL_ERROR_MESSAGE),
  password: yup
    .string()
    .required(PASSWORD_ERROR_MESSAGE),
});
