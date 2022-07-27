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
export interface AnimeListParams {

  /** The page number to be returned. */
  pageNumber: number;

  /** Sort setting. */
  sort: SortSetting;

  /** Filter setting. */
  filter: FilterSetting;
}
