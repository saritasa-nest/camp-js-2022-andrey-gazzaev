import { OmitImmerable } from './immerable';

/** Error coming from the server. */
export class HttpError {

  /** Error Description. */
  public readonly detail: string;

  public constructor(error: InitArgsHttpError) {
    this.detail = error.detail;
  }
}

type InitArgsHttpError = OmitImmerable<HttpError>;
