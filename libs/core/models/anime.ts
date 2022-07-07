import { Immerable, OmitImmerable } from './immerable';

/** Possible options anime type. */
export enum Type {
  Tv = 'TV',
  Ova = 'OVA',
  Movie = 'MOVIE',
  Special = 'SPECIAL',
  Ona = 'ONA',
  Music = 'MUSIC',
}

/** Possible options anime status. */
export enum Status {
  Airing = 'AIRING',
  Finished = 'FINISHED',
  NotYetAired = 'NOT_YET_AIRED',
}

/** Date range. */
export class DateRange extends Immerable {

  /** End date Anime. */
  public readonly end: Date;

  /** Start date Anime. */
  public readonly start: Date;

  public constructor(data: InitArgsDateRange) {
    super();
    this.end = data.end;
    this.start = data.start;
  }
}

/** Anime. */
export class Anime extends Immerable {

  /** ID. */
  public readonly id: number;

  /** Url address image. */
  public readonly image: string;

  /** Title in English. */
  public readonly titleEnglish: string;

  /** Title in Japanese. */
  public readonly titleJapanese: string;

  /** Release and end dates. */
  public readonly aired: DateRange;

  /** Anime type. */
  public readonly type: Type;

  /** Anime status. */
  public readonly status: Status;

  public constructor(data: InitArgsAnime) {
    super();
    this.id = data.id;
    this.image = data.image;
    this.titleEnglish = data.titleEnglish;
    this.titleJapanese = data.titleJapanese;
    this.aired = data.aired;
    this.type = data.type;
    this.status = data.status;
  }
}

type InitArgsDateRange = OmitImmerable<DateRange>;
type InitArgsAnime = OmitImmerable<Anime>;
