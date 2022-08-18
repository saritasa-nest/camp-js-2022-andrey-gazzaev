import { AppError } from '@js-camp/core/models/app-error';
import { FormError } from '@js-camp/core/models/form-error';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';
import { Token } from '@js-camp/core/models/token';

/** Auth state. */
export interface AuthState {

  /** Whether authentication is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: AppError<FormError<Login> | FormError<Registration>>;

  /** Token. */
  readonly token: Token | null;
}

export const initialState: AuthState = {
  isLoading: false,
  token: null,
};
