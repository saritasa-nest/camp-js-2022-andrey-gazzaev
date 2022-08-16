import { DateRangeDto } from './dateRange.dto';

/** Possible options anime type. */
export enum AnimeTypeDto {
  Tv = 'TV',
  Ova = 'OVA',
  Movie = 'MOVIE',
  Special = 'SPECIAL',
  Ona = 'ONA',
  Music = 'MUSIC',
}

/** Possible options anime status. */
export enum AnimeStatusDto {
  Airing = 'AIRING',
  Finished = 'FINISHED',
  NotYetAired = 'NOT_YET_AIRED',
}

/** Fields by which you can sort. */
export enum SortFieldDto {
  TitleEnglish = 'title_eng',
  TitleJapanese = 'title_jpn',
  Aired = 'aired',
  Status = 'status',
}

/** Ordering direction. */
export enum SortDirectionDto {
  Ascending = '',
  Descending = '-',
}

/** Anime DTO. */
export interface AnimeBaseDto {

  /** ID. */
  readonly id: number;

  /** Created date. */
  readonly created: string;

  /** Modified date. */
  readonly modified: string;

  /** Url address image. */
  readonly image: string;

  /** Title in english. */
  readonly title_eng: string;

  /** Title in Japanese. */
  readonly title_jpn: string;

  /** Release and end dates. */
  readonly aired: DateRangeDto;

  /** Anime type. */
  readonly type: AnimeTypeDto;

  /** Anime status. */
  readonly status: AnimeStatusDto;
}
