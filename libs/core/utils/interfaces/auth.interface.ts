import { User } from '../../models/user';

/** Data necessary for login. */
export interface LoginData {

  /** Email of user. */
  readonly email: string;

  /** Password of user. */
  readonly password: string;
}

/** Data necessary for register. */
export interface RegistrationData {

  /** User information. */
  readonly user: User;

  /** Password of user. */
  readonly password: string;
}
