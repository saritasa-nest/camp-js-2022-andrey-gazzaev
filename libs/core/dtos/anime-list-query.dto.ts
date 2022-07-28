/** Params for request anime list. */
export interface AnimeListQueryDto {

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
