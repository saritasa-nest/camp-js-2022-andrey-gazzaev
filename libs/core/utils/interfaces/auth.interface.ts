/** Data necessary for login. */
export interface LoginData {

  /** Email of user. */
  readonly email: string;

  /** Password of user. */
  readonly password: string;
}

interface UserInfo {

  /** User email. */
  readonly email: string;

  /** First name. */
  readonly firstName: string;

  /** Last name. */
  readonly lastName: string;

  /** URL to avatar image. */
  readonly avatar: string;
}

/** Data necessary for register. */
export interface RegistrationData {

  /** User information. */
  readonly user: UserInfo;

  /** Password of user. */
  readonly password: string;
}
