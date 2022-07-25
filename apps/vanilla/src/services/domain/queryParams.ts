import { isDefined } from '@js-camp/core/utils/guards/general.guard';
import { isSortField, isSortOrdering, isStatus, isType } from '@js-camp/core/utils/guards/sort.guard';
import { SortOrdering } from '@js-camp/core/utils/types/sort';

import { PaginationOptions } from '../../types/paginationSettings';

/** Functionality for working with query parameters. */
export namespace QueryParamsService {

  /** All possible query parameters. */
  enum Param {
    Offset = 'offset',
    Limit = 'limit',
    Ordering = 'ordering',
    Status = 'status',
    Type = 'type',
    Id = 'id',
  }

  /**
   * Converts paginationOptions to UrlSearchParams.
   * @param paginationOptions Pagination options.
   */
  export function paginationOptionsToUrlSearchParams(paginationOptions: PaginationOptions): URLSearchParams {
    const offset = [Param.Offset, String(paginationOptions.offset)];
    const limit = [Param.Limit, String(paginationOptions.limit)];
    const ordering = [Param.Ordering, `${paginationOptions.sort.ordering}${paginationOptions.sort.field}`];
    const status = [Param.Status, paginationOptions.filter.byStatusField];
    const type = [Param.Type, paginationOptions.filter.byTypeField];

    const params = [offset, limit, ordering, status, type];
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

    const offset = params.get(Param.Offset);
    const limit = params.get(Param.Limit);
    const ordering = params.get(Param.Ordering);
    const status = params.get(Param.Status);
    const type = params.get(Param.Type);

    if (!isDefined(ordering) || !isDefined(status) || !isDefined(limit) || !isDefined(type)) {
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
    const idParam = [Param.Id, String(id)];
    const params = new URLSearchParams([idParam]);
    window.history.pushState({}, '', `/details/?${params.toString()}`);
  }

  /** Gets details query params. */
  export function getDetailsParams(): number | null {
    const params = new URLSearchParams(window.location.search);
    const id = params.get(Param.Id);
    if (isDefined(id)) {
      return Number(id);
    }
    return null;
  }
}
