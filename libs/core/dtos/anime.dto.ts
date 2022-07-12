import { GenreDto } from './genre.dto';
import { StudioDto } from './studio.dto';
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
export interface AnimeDto {

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
  readonly type: TypeDto;

  /** Anime status. */
  readonly status: StatusDto;

  /** List of anime genres. */
  readonly genres_data?: readonly GenreDto[];

  /** List of anime producing studios. */
  readonly studios_data?: readonly StudioDto[];

  /** It's on the air. */
  readonly airing?: boolean;

  /** Anime trailer URL.. */
  readonly trailer_youtube_id?: string;

  /** Short review about anime. */
  readonly synopsis?: string;
}
