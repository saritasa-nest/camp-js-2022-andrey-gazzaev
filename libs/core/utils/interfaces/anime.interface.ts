/** Sort setting for anime list request. */
export interface SortSetting {

  /** The field by which to sort. */
  field: string;

  /** The sort direction. */
  direction: string;
}

/** Filter setting for anime list request. */
export interface FilterSetting {

  /** All possibly types. */
  byType: string[];
}

/** Params for for anime list request. */
export interface AnimeListOptions {

  /** The page number to be returned. */
  readonly pageNumber: number;

  /** Sort setting. */
  readonly sort: SortSetting;

  /** Filter setting. */
  readonly filter: FilterSetting;

  /** Search query. */
  readonly search: string;

  /** Maximum number of entries per page.*/
  readonly limit?: number;
}

/** Params for request anime list. */
export interface AnimeListQueryParams {

  /** Sort settings. */
  readonly ordering: string;

  /** Filter by type. */
  readonly type: string;

  /** Maximum number of entries per page. */
  readonly limit: number;

  /** Offset in records. */
  readonly offset: number;

  /** Search query. */
  readonly search: string;
}
