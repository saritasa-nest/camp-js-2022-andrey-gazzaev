import { Status } from '@js-camp/core/models/anime';

/** Fields by which you can sort. */
export enum SortField {
  TitleEnglish = 'title_eng',
  TitleJapanese = 'title_jpn',
  Aired = 'aired',
}

/** Ordering direction. */
export enum SortOrdering {
  Ascending = '',
  Descending = '-',
}

/** Filter settings. */
export interface Filter {

  /** Filter by status field. */
  readonly byStatusField: Status;
}

/** Sort settings. */
export interface Sort {

  /** Ordering direction. */
  readonly ordering: SortOrdering;

  /** Field by sort. */
  readonly field: SortField;
}

/** Pagination settings. */
export interface PaginationOptions {

  /** Sort settings. */
  readonly sort: Sort;

  /** Filter settings. */
  readonly filter: Filter;

  /** Maximum number of entries per page. */
  readonly limit: number;
}
