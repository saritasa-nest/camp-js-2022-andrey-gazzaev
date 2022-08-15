/** Error coming from the server. */
export class httpError extends Error {

  /**
   * Error message.
   */
  public override readonly message: string;

  public constructor(message: string) {
    super(message);
    this.message = message;
  }
}
