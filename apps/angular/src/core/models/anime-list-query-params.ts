import { Type } from '@js-camp/core/models/anime';
import { SortDirection } from '@angular/material/sort';

/** Anime list parameters contained in URL.  */
export interface AnimeListQueryParams {

  /** Current page number. */
  readonly page: number;

  /** Number of records per page. */
  readonly pageSize: number;

  /** Filter by type. */
  readonly types: Type[];

  /** Search query. */
  readonly search: string;

  /** Sort field. */
  readonly ordering: string;

  /** Sort direction. */
  readonly direction: SortDirection;
}
