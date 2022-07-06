/** Required values for pagination. */
export namespace Pagination {

  /** First page. */
  export const FIRST_PAGE_NUMBER = 1;

  /** Anime offset when requesting a new page. */
  export const START_OFFSET = 25;

  /** Anime limit when requesting a new page. */
  export const DEFAULT_LIMIT = START_OFFSET;

  /** Page offset in pagination. */
  export const PAGE_OFFSET = 3;

  /** Separator for first and last page in pagination. */
  export const ELLIPSIS = '...';
}
