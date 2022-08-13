import { DateRange } from './dateRange';
import { Immerable, OmitImmerable } from './immerable';

/** Possible options anime type. */
export enum AnimeType {
  Tv = 'TV',
  Ova = 'OVA',
  Movie = 'MOVIE',
  Special = 'SPECIAL',
  Ona = 'ONA',
  Music = 'MUSIC',
}

/** Possible options anime status. */
export enum AnimeStatus {
  Airing = 'Airing',
  Finished = 'Finished',
  NotYetAired = 'Not yet aired',
}

/** Anime. */
export class AnimeBase extends Immerable {

  /** ID. */
  public readonly id: number;

  /** Url address image. */
  public readonly image: string;

  /** Title in English. */
  public readonly titleEnglish: string | null;

  /** Title in Japanese. */
  public readonly titleJapanese: string | null;

  /** Title for alt image. */
  public readonly imageTitle: string;

  /** Release start and end dates. */
  public readonly aired: DateRange;

  /** Anime type. */
  public readonly type: AnimeType;

  /** Anime status. */
  public readonly status: AnimeStatus;

  public constructor(data: InitArgsAnimeBase) {
    super();
    this.id = data.id;
    this.image = data.image;
    this.titleEnglish = data.titleEnglish;
    this.titleJapanese = data.titleJapanese;
    this.aired = data.aired;
    this.type = data.type;
    this.status = data.status;
    this.imageTitle = data.imageTitle;
  }
}

type InitArgsAnimeBase = OmitImmerable<AnimeBase>;
