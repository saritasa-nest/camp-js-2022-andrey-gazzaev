import { DateRange } from './dateRange';
import { Immerable, OmitImmerable } from './immerable';

/** Possible options anime type. */
export enum AnimeType {
  Tv = 'TV',
  Ova = 'OVA',
  Movie = 'Movie',
  Special = 'Special',
  Ona = 'ONA',
  Music = 'Music',
}

/** Possible options anime status. */
export enum AnimeStatus {
  Airing = 'Airing',
  Finished = 'Finished',
  NotYetAired = 'Not yet aired',
}

/** Sort settings. */
export interface AnimeSort<TDirection, TField> {

  /** Ordering direction. */
  readonly direction: TDirection;

  /** Field by sort. */
  readonly field: TField;
}

/** Fields by which you can sort. */
export enum AnimeSortDirection {
  Ascending = 'asc',
  Descending = 'des',
}

/** Fields by which you can sort. */
export enum AnimeSortField {
  TitleEnglish = 'english',
  TitleJapanese = 'japanese',
  Aired = 'aired',
  Status = 'status',
}

/** Anime. */
export class AnimeBase extends Immerable {

  /** ID. */
  public readonly id: number;

  /** Url address image. */
  public readonly image: string;

  /** Title in English. */
  public readonly titleEnglish: string;

  /** Title in Japanese. */
  public readonly titleJapanese: string;

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
