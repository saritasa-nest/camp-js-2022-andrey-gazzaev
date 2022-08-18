import { AppError } from '@js-camp/core/models/app-error';
import { FormError } from '@js-camp/core/models/form-error';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';
import { User } from '@js-camp/core/models/user';

/** Auth state. */
export interface AuthState {

  /** Whether authentication is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: AppError<FormError<Login> | FormError<Registration>>;

  /** User. */
  readonly user: User | null;
}

export const initialState: AuthState = {
  isLoading: false,
  user: null,
};
