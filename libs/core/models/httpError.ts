/** Error coming from the server. */
export class HttpError extends Error {

  /** Error description. */
  public readonly detail: string;

  public constructor(detail: string) {
    super();
    this.detail = detail;
  }
}
