/** Data required for registration. */
export interface Registration {

  /** Email. */
  readonly email: string;

  /** First name. */
  readonly firstName: string;

  /** Last name. */
  readonly lastName: string;

  /** Password. */
  readonly password: string;

  /** URL to user avatar. */
  readonly avatarUrl: string;
}
