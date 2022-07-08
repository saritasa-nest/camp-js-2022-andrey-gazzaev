import { Status } from '@js-camp/core/models/anime';

/** The option element. */
export interface Option {

  /** The text that contains the option. */
  readonly text: string;

  /** Option value. */
  readonly value: string;
}

/** Select and its options. */
export interface SelectOptions {

  /** The name of the field used. */
  readonly name: string;

  /** CSS class selector. */
  readonly selector: string;

  /** All select options. */
  readonly options: readonly Option[];
}

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
