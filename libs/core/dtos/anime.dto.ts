import { AnimeEnums } from '../utils/types/animeEnums';

import { DateRangeDto } from './dateRange.dto';

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

  /**  Title in Japanese. */
  readonly title_jpn: string;

  /** Release and end dates. */
  readonly aired: DateRangeDto;

  /** Anime type. */
  readonly type: AnimeEnums.Type;

  /** Anime status. */
  readonly status: AnimeEnums.Status;
}
