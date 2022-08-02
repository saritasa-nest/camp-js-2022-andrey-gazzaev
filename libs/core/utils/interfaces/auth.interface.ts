/** Data necessary for login. */
export interface LoginData {

  /** Email of user. */
  readonly email: string;

  /** Password of user. */
  readonly password: string;
}

/** Data necessary for register. */
export interface RegistrationData {

  /** User email. */
  readonly email: string;

  /** First name. */
  readonly firstName: string;

  /** Last name. */
  readonly lastName: string;

  /** Password of user. */
  readonly password: string;
}
