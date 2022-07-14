import { FIRST_PAGE_NUMBER } from '../../constants/pagination';
import { PaginationBorders } from '../../types/paginationSettings';

export namespace PaginationService {

  const PAGE_OFFSET = 3;

  /**
   * Defines pagination boundaries relative to the current page.
   * @param allCount All records that the server can provide.
   * @param currentPageNumber Page for which you want to create a pagination.
   * @param limit Limit when requesting a new page.
   */
  export function definePaginationBoundaries(
    allCount: number,
    currentPageNumber: number,
    limit: number,
  ): PaginationBorders {
    const lastPage = Math.ceil(allCount / limit);

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
}
