import { OmitImmerable } from './immerable';

/** Error coming from the server. */
export class HttpError extends Error {

  /** Error Description. */
  public readonly detail: string;

  public constructor(error: InitArgsHttpError) {
    super();
    this.detail = error.detail;
  }
}

type InitArgsHttpError = OmitImmerable<HttpError>;
