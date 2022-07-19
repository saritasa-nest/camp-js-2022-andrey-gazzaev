import { isDefine } from '@js-camp/core/utils/guards/general.guard';
import { isSortField, isSortOrdering, isStatus, isType } from '@js-camp/core/utils/guards/sort.guard';
import { SortOrdering } from '@js-camp/core/utils/types/sort';

import { PaginationOptions } from '../../types/paginationSettings';

/** Functionality for working with query parameters. */
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
      return window.history.pushState({}, '', `/list/?${paginationOptionsToUrlSearchParams(searchParams).toString()}`);
    }
    window.history.pushState({}, '', `/list/?${searchParams.toString()}`);
  }

  /** Gets pagination query params. */
  export function getPaginationParams(): PaginationOptions | null {
    const params = new URLSearchParams(window.location.search);

    const ordering = params.get('ordering');
    const offset = params.get('offset');
    const status = params.get('status');
    const type = params.get('type');
    const limit = params.get('limit');

    if (!isDefine(ordering) || !isDefine(status) || !isDefine(limit) || !isDefine(type)) {
      return null;
    }

    const field = ordering.replace('-', '');
    const direction = ordering.includes('-') ? SortOrdering.Descending : SortOrdering.Ascending;

    if (isSortField(field) && isSortOrdering(direction) && (isStatus(status) || status === '') && (isType(type) || type === '')) {
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

  /**
   * Sets details query params into url.
   * @param id ID of anime.
   */
  export function setDetailsParams(id: number): void {
    const idParam = ['id', String(id)];
    const params = new URLSearchParams([idParam]);
    window.history.pushState({}, '', `/details/?${params.toString()}`);
  }

  /** Gets details query params. */
  export function getDetailsParams(): number | null {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id !== null) {
      return Number(id);
    }
    return null;
  }
}
