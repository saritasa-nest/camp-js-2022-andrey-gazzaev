import { isSortField, isSortOrdering, isStatus, isType } from '@js-camp/core/utils/guards/sort.guard';
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
    const typeParam = ['type', paginationOptions.filter.byTypeField];

    const params = [offsetParam, limitParam, orderingParam, statusParam, typeParam];
    return new URLSearchParams(params);
  }

  /**
   * Sets pagination query params into url.
   * @param searchParams List of params.
   */
  export function setPaginationParams(searchParams: URLSearchParams | PaginationOptions): void {
    if (!(searchParams instanceof URLSearchParams)) {
      return window.history.pushState({}, '', `/?${paginationOptionsToUrlSearchParams(searchParams).toString()}`);
    }
    window.history.pushState({}, '', `/?${searchParams.toString()}`);
  }

  /** Gets pagination query params. */
  export function getPaginationParams(): PaginationOptions | null {
    const params = new URLSearchParams(window.location.search);

    const ordering = params.get('ordering');
    const offset = params.get('offset');
    const status = params.get('status');
    const type = params.get('type');
    const limit = params.get('limit');

    if (ordering === null || status === null || limit === null || type === null) {
      return null;
    }

    const field = ordering.replace('-', '');
    const direction = ordering.includes('-') ? SortOrdering.Descending : SortOrdering.Ascending;

    if (isSortField(field) && isSortOrdering(direction) && isStatus(status) && isType(type)) {
      return {
        sort: {
          field,
          ordering: direction,
        },
        filter: {
          byStatusField: status,
          byTypeField: type,
        },
        limit: Number(limit),
        offset: Number(offset),
      };
    }
    return null;
  }
}
