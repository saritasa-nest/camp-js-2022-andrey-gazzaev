import { AnimeEnums } from '@js-camp/core/utils/types/anime.enums';
import { Sort, SortField, SortOrdering } from '@js-camp/core/utils/types/sort';

/** Filter settings. */
export interface Filter {

  /** Filter by status field. */
  readonly byStatusField: AnimeEnums.Status;
}

/** Pagination query settings. */
export interface QueryOptions {

  /** Sort settings. */
  readonly sort: Sort<SortOrdering, SortField>;

  /** Filter settings. */
  readonly filter: Filter;

  /** Search query. */
  readonly search: string;

  /** Maximum number of entries per page. */
  readonly limit: number;
}
