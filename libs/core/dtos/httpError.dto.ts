/** Some set of errors DTO. */
export interface ErrorDataDto {

  /** Errors for a specific field. */
  readonly [key: string]: readonly string[];

  /** Missing fields. */
  readonly non_field_errors: readonly string[];
}

/** Error coming from the server DTO. */
export interface HttpErrorDto extends Error {

  /** Error data. */
  readonly data?: ErrorDataDto;

  /** Error code. */
  readonly code?: string;

  /** Error Description. */
  readonly detail: string;
}
