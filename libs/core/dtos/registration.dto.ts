/** Data required for registration. */
export interface RegistrationDto {

  /** Email. */
  readonly email: string;

  /** First name. */
  readonly first_name: string;

  /** Last name. */
  readonly last_name: string;

  /** URL avatar image. */
  readonly avatar: string;

  /** Super complex password. */
  readonly password: string;
}
