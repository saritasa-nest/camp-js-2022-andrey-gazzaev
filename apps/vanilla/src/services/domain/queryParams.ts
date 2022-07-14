import { isSortField, isSortOrdering, isStatus } from '@js-camp/core/utils/guards/sort.guard';
import { SortOrdering } from '@js-camp/core/utils/types/sort';

import { PaginationOptions } from '../../types/paginationSettings';

export namespace QueryParamsService {

  /**
   * Converts paginationOptions to UrlSearchParams.
   * @param paginationOptions Pagination options.
   */
  export function paginationOptionsToUrlSearchParams(paginationOptions: PaginationOptions): URLSearchParams {
    const offsetParam = ['offset', String(paginationOptions.offset)];
    const limitParam = ['limit', String(paginationOptions.limit)];
    const orderingParam = ['ordering', `${paginationOptions.sort.ordering}${paginationOptions.sort.field}`];
    const statusParam = ['status', paginationOptions.filter.byStatusField];

    const params = [offsetParam, limitParam, orderingParam, statusParam];
    return new URLSearchParams(params);
  }

  /**
   * Sets query params into url.
   * @param searchParams List of params.
   */
  export function setParams(searchParams: URLSearchParams | PaginationOptions): void {
    if (!(searchParams instanceof URLSearchParams)) {
      return window.history.pushState({}, '', `/?${paginationOptionsToUrlSearchParams(searchParams).toString()}`);
    }
    window.history.pushState({}, '', `/?${searchParams.toString()}`);
  }

  /** Gets query params. */
  export function getParams(): PaginationOptions | null {
    const params = new URLSearchParams(window.location.search);

    const ordering = params.get('ordering');
    const offset = params.get('offset');
    const status = params.get('status');
    const limit = params.get('limit');

    if (ordering === null || status === null || limit === null) {
      return null;
    }

    const field = ordering.replace('-', '');
    const direction = ordering.includes('-') ? SortOrdering.Descending : SortOrdering.Ascending;

    if (isSortField(field) && isSortOrdering(direction) && isStatus(status)) {
      return {
        sort: {
          field,
          ordering: direction,
        },
        filter: {
          byStatusField: status,
        },
        limit: Number(limit),
        offset: Number(offset),
      };
    }
    return null;
  }
}
