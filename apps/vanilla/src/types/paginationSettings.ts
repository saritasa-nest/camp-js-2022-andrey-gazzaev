import { Status } from '@js-camp/core/models/anime';
import { Sort, SortField, SortOrdering } from '@js-camp/core/utils/types/sort';

/** Filter settings. */
export interface Filter {

  /** Filter by status field. */
  readonly byStatusField: Status;
}

/** Pagination settings. */
export interface PaginationOptions {

  /** Sort settings. */
  readonly sort: Sort<SortOrdering, SortField>;

  /** Filter settings. */
  readonly filter: Filter;

  /** Maximum number of entries per page. */
  readonly limit: number;
}
