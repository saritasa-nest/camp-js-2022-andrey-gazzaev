import { isDefined } from '@js-camp/core/utils/guards/general.guard';

import { DEFAULT_OFFSET, FIRST_PAGE_NUMBER } from '../../constants/pagination';
import { PaginationBorders } from '../../types/paginationSettings';

import { QueryParamsService } from './queryParams';

/** Functionality for working with pagination. */
export namespace PaginationService {

  const PAGE_OFFSET = 3;

  /**
   * Defines pagination boundaries relative to the current page.
   * @param totalCount All records that the server can provide.
   * @param currentPageNumber Page for which you want to create a pagination.
   * @param limit Limit when requesting a new page.
   */
  export function definePaginationBoundaries(
    totalCount: number,
    currentPageNumber: number,
    limit: number,
  ): PaginationBorders {
    const lastPage = Math.ceil(totalCount / limit);

    const prevPage = currentPageNumber - PAGE_OFFSET < FIRST_PAGE_NUMBER ?
      FIRST_PAGE_NUMBER :
      currentPageNumber - PAGE_OFFSET;

    const nextPage = currentPageNumber + PAGE_OFFSET > lastPage ?
      lastPage :
      currentPageNumber + PAGE_OFFSET;

    return {
      firstPage: FIRST_PAGE_NUMBER,
      prevPage,
      nextPage,
      lastPage,
    };
  }

  /** Gets current page of pagination. */
  export function getCurrentPage(): number {
    const paginationOptions = QueryParamsService.getPaginationParams();

    if (!isDefined(paginationOptions)) {
      return FIRST_PAGE_NUMBER;
    }

    return paginationOptions.offset === DEFAULT_OFFSET ? FIRST_PAGE_NUMBER : paginationOptions.offset / paginationOptions.limit;
  }

  /**
   * Gets current offset of pagination.
   * @param currentPageNumber Current pagination page.
   * @param limit Limit posts per page.
   */
  export function getCurrentOffset(currentPageNumber: number, limit: number): number {
    return currentPageNumber === FIRST_PAGE_NUMBER ? 0 : currentPageNumber * limit;
  }
}
