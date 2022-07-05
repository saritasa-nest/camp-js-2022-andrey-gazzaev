/** User DTO. */
export interface UserDto {

  /** User email. */
  readonly email: string;

  /** First name. */
  readonly first_name: string;

  /** Last name. */
  readonly last_name: string;

  /** URL to avatar image. */
  readonly avatar: string;

  /** Creation time. */
  readonly created: string;

  /** Time of the last modification. */
  readonly modified: string;
}
