import { Immerable, OmitImmerable } from './immerable';

/** Genre. */
export class Genre extends Immerable {

  /** Id. */
  public readonly id: number;

  /** Name. */
  public readonly name: string;

  public constructor(data: InitArgsGenre) {
    super();
    this.id = data.id;
    this.name = data.name;
  }
}

type InitArgsGenre = OmitImmerable<Genre>;
