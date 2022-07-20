import { Immerable, OmitImmerable } from './immerable';

/** Pagination meta info. */
export class Pagination<T> extends Immerable {

  /** Total count of items. */
  public readonly count: number;

  /** Next page of items. */
  public readonly next: string | null;

  /** Previous page of items. */
  public readonly previous: string | null;

  /** Array of items requested. */
  public readonly results: readonly T[];

  public constructor(data: InitArgsPagination<T>) {
    super();
    this.count = data.count;
    this.previous = data.previous;
    this.next = data.next;
    this.results = data.results;
  }
}

type InitArgsPagination<T> = OmitImmerable<Pagination<T>>;
