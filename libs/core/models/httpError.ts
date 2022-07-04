/** Error coming from the server. */
export class HttpError extends Error {

  /** Error Description. */
  public readonly detail: string;

  /** Error code. */
  public readonly code: number;

  public constructor(detail: string, code: number) {
    super();
    this.detail = detail;
    this.code = code;
  }
}
