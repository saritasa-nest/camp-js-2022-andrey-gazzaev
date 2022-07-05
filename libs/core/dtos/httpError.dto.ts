/** Some set of errors DTO. */
export interface ErrorDataDto {

  /** Missing fields. */
  readonly non_field_errors: readonly string[];
}

/** Error coming from the server DTO. */
export interface HttpErrorDto extends Error {

  /** Error data. */
  readonly data?: ErrorDataDto;

  /** Error Description. */
  readonly detail: string;

  /** Error code. */
  readonly code: string;
}
