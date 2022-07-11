import { Anime } from '@js-camp/core/models/anime';

/** Ready anime data. */
export interface AnimeData {

  /** List of anime contained in the table. */
  readonly animeList: readonly Anime[];

  /** The total number of anime on which the pagination is based. */
  readonly totalAnimeCount: number;

  /** The current page on which pagination is based. */
  readonly currentPageNumber: number;

  /** Maximum number of entries per page. */
  readonly limit: number;
}
