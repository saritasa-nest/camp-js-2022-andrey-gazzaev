import { AnimeType, SortField } from '@js-camp/core/models/anime';
import { SortDirection } from '@angular/material/sort';

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
  readonly sort: {

    /** Field. */
    readonly field: SortField;

    /** Direction. */
    readonly direction: SortDirection;
  };
}
