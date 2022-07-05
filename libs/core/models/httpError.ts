import { OmitImmerable } from './immerable';

/** Some set of errors. */
export class ErrorData {

  /** Missing fields. */
  public readonly nonFieldErrors: readonly string[];

  public constructor(nonFieldErrors: readonly string[]) {
    this.nonFieldErrors = nonFieldErrors;
  }
}

/** Error coming from the server. */
export class HttpError extends Error {

  /** Error Description. */
  public readonly data?: ErrorData;

  /** Error Description. */
  public readonly detail: string;

  /** Error code. */
  public readonly code: number;

  public constructor(error: PostInitArgsHttpError) {
    super();
    this.detail = error.detail;
    this.code = error.code;
    this.data = error.data;
  }
}

type PostInitArgsHttpError = OmitImmerable<HttpError>;
