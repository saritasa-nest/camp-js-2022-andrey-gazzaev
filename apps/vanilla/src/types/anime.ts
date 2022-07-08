import { Anime } from '@js-camp/core/models/anime';
import { DateRange } from '@js-camp/core/models/dateRange';

/** Ready anime data. */
export interface AnimeData {

  /** List of anime contained in the table. */
  readonly animeList: readonly Anime<DateRange>[];

  /** The total number of anime on which the pagination is based. */
  readonly totalAnimeCount: number;

  /** The current page on which pagination is based. */
  readonly currentPageNumber: number;
}
