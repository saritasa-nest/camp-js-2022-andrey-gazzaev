import { AnimeSort, AnimeSortDirection, AnimeSortField, AnimeType } from './anime';

/** Anime list parameters contained in URL.  */
export interface AnimeListQueryParams {

  /** Current page number. */
  readonly page: number;

  /** Number of records per page. */
  readonly pageSize: number;

  /** Filter by type. */
  readonly types: AnimeType[];

  /** Search query. */
  readonly search: string;

  /** Sort. */
  readonly sort: AnimeSort<AnimeSortDirection, AnimeSortField>;
}
