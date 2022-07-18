/** Authorization tokens DTO. */
export interface TokensDto {

  /** Refresh token. */
  readonly refresh: string;

  /** Access token. */
  readonly access: string;
}
