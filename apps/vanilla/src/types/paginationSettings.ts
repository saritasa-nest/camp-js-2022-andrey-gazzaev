import { Status, Type } from '@js-camp/core/models/anime';
import { Sort, SortField, SortOrdering } from '@js-camp/core/utils/types/sort';

/** Filter settings. */
export interface Filter {

  /** Filter by type field. */
  readonly byTypeField: Type | '';

  /** Filter by status field. */
  readonly byStatusField: Status | '';
}

/** Pagination settings. */
export interface PaginationOptions {

  /** Sort settings. */
  readonly sort: Sort<SortOrdering, SortField>;

  /** Filter settings. */
  readonly filter: Filter;

  /** Maximum number of entries per page. */
  readonly limit: number;

  /** Offset in records. */
  readonly offset: number;
}

/** Borders due to which pagination is built. */
export interface PaginationBorders {

  /** The first page in pagination. */
  readonly firstPage: number;

  /** The first page, taking into account the offset from the current page. */
  readonly prevPage: number;

  /** The last page, taking into account the offset from the current page. */
  readonly nextPage: number;

  /** The last page in pagination. */
  readonly lastPage: number;
}

/** Information needed to build pagination. */
export interface PaginationData {

  /** Pagination borders. */
  readonly borders: PaginationBorders;

  /** Page for which you want to create a pagination. */
  readonly currentPage: number;
}
