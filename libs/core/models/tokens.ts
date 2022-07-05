import { Immerable, OmitImmerable } from './immerable';

/** Authorization tokens. */
export class Tokens extends Immerable {

  /** Refresh token. */
  public readonly refresh: string;

  /** Access token. */
  public readonly access: string;

  public constructor(data: PostInitArgsTokens) {
    super();
    this.refresh = data.refresh;
    this.access = data.access;
  }
}

type PostInitArgsTokens = OmitImmerable<Tokens>;
