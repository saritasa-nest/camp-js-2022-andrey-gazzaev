import { DateRangeDto } from './dateRange.dto';

/** Possible options anime type. */
export enum TypeDto {
  Tv = 'TV',
  Ova = 'OVA',
  Movie = 'MOVIE',
  Special = 'SPECIAL',
  Ona = 'ONA',
  Music = 'MUSIC',
}

/** Possible options anime status. */
export enum StatusDto {
  Airing = 'AIRING',
  Finished = 'FINISHED',
  NotYetAired = 'NOT_YET_AIRED',
}

/** Anime DTO. */
export interface AnimeBaseDto {

  /** ID. */
  readonly id: number;

  /** Url address image. */
  readonly image: string | null;

  /** Title in english. */
  readonly title_eng: string;

  /** Title in Japanese. */
  readonly title_jpn: string;

  /** Release and end dates. */
  readonly aired: DateRangeDto;

  /** Anime type. */
  readonly type: TypeDto;

  /** Anime status. */
  readonly status: StatusDto;
}
