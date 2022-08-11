import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isSortField, isType } from '@js-camp/core/utils/guards/sort.guard';
import { SortDirection, SortField } from '@js-camp/core/utils/types/sort';

import { isTypeArray } from '../../guards/type-array';
import { AnimeListOptions } from '../../models/anime-list-options';

/** All possible query parameters. */
enum ParamName {
  Offset = 'offset',
  Limit = 'limit',
  Ordering = 'ordering',
  TypeIn = 'type__in',
  Search = 'search',
}

const defaultParams = {
  limit: 25,
  offset: 0,
  search: '',
  ordering: `${SortDirection.Ascending}${SortField.TitleEnglish}`,
  type: 'TV',
};

/** Params mapper. */
@Injectable({ providedIn: 'root' })
export class AnimeListOptionsMapper {

  public constructor(private readonly route: ActivatedRoute) { }

  /**
   * Maps model to dto.
   * @param model AnimeListOptions model.
   */
  public toDto({
    pageNumber,
    sort,
    filter,
    search,
    limit = defaultParams.limit,
  }: AnimeListOptions): URLSearchParams {
    const direction = sort.direction === 'asc' ? SortDirection.Ascending : SortDirection.Descending;
    const sortField = isSortField(sort.field) ? sort.field : SortField.TitleEnglish;
    const ordering = `${direction}${sortField}`;

    const filterType = filter.byType.every(type => isType(type)) ? filter.byType.toString() : '';

    return new URLSearchParams([
      [ParamName.Limit, String(limit)],
      [ParamName.Offset, String(pageNumber * limit)],
      [ParamName.Ordering, ordering],
      [ParamName.TypeIn, filterType],
      [ParamName.Search, search],
    ]);
  }

  /** Maps dto to model. */
  public fromDto(): AnimeListOptions {
    const params = this.route.snapshot.queryParams;

    const limit = params[ParamName.Limit] !== undefined ? Number(params[ParamName.Limit]) : defaultParams.limit;
    const offset = params[ParamName.Offset] !== undefined ? Number(params[ParamName.Offset]) : defaultParams.offset;
    const ordering = params[ParamName.Ordering] !== undefined ? String(params[ParamName.Ordering]) : defaultParams.ordering;

    const field = ordering.replace('-', '');
    const direction = ordering.includes('-') ? 'desc' : 'asc';

    const type = params[ParamName.TypeIn] !== undefined ? String(params[ParamName.TypeIn]) : defaultParams.type;
    const search = params[ParamName.Search] !== undefined ? String(params[ParamName.Search]) : defaultParams.search;

    const typeFilter = type.split(',')
      .map(value => isType(value) ? value : '')
      .filter(value => value !== '');

    return new AnimeListOptions({
      pageNumber: offset / limit,
      sort: {
        direction,
        field,
      },
      filter: {
        byType: isTypeArray(typeFilter) ? typeFilter : [],
      },
      limit,
      search,
    });
  }

  /** Gets limit page. */
  public getLimit(): number {
    return defaultParams.limit;
  }
}
