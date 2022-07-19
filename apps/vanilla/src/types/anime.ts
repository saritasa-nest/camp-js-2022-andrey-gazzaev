import { AnimeBase } from '@js-camp/core/models/anime';

/** Ready anime data. */
export interface AnimeData {

  /** List of anime contained in the table. */
  readonly list: readonly AnimeBase[];

  /** The total number of anime on which the pagination is based. */
  readonly totalCount: number;

  /** The current page on which pagination is based. */
  readonly currentPageNumber: number;

  /** Maximum number of entries per page. */
  readonly limit: number;
}
