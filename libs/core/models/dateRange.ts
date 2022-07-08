import { Immerable, OmitImmerable } from './immerable';

/** Date range. */
export class DateRange extends Immerable {

  /** End date. */
  public readonly end: Date;

  /** Start date. */
  public readonly start: Date;

  public constructor(data: InitArgsDateRange) {
    super();
    this.end = data.end;
    this.start = data.start;
  }
}

type InitArgsDateRange = OmitImmerable<DateRange>;
