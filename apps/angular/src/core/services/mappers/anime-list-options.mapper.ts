import { HttpParams } from '@angular/common/http';
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

namespace DefaultParamValue {
  export const LIMIT = 25;
  export const OFFSET = 0;
  export const SEARCH = '';
  export const ORDERING = `${SortDirection.Ascending}${SortField.TitleEnglish}`;
  export const TYPE = 'TV';
}

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
    limit = DefaultParamValue.LIMIT,
  }: AnimeListOptions): HttpParams {
    const direction = sort.direction === 'asc' ? SortDirection.Ascending : SortDirection.Descending;
    const sortField = isSortField(sort.field) ? sort.field : SortField.TitleEnglish;
    const ordering = `${direction}${sortField}`;

    const filterType = filter.byType.every(type => isType(type)) ? filter.byType.toString() : '';
    return new HttpParams()
      .set(ParamName.Limit, limit)
      .set(ParamName.Offset, pageNumber * limit)
      .set(ParamName.Ordering, ordering)
      .set(ParamName.TypeIn, filterType)
      .set(ParamName.Search, search);
  }

  /** Maps dto to model. */
  public fromDto(): AnimeListOptions {
    const params = this.route.snapshot.queryParams;

    const limit = params[ParamName.Limit] !== undefined ? Number(params[ParamName.Limit]) : DefaultParamValue.LIMIT;
    const offset = params[ParamName.Offset] !== undefined ? Number(params[ParamName.Offset]) : DefaultParamValue.OFFSET;
    const ordering = params[ParamName.Ordering] !== undefined ? String(params[ParamName.Ordering]) : DefaultParamValue.ORDERING;

    const field = ordering.replace('-', '');
    const direction = ordering.includes('-') ? 'desc' : 'asc';

    const type = params[ParamName.TypeIn] !== undefined ? String(params[ParamName.TypeIn]) : DefaultParamValue.TYPE;
    const search = params[ParamName.Search] !== undefined ? String(params[ParamName.Search]) : DefaultParamValue.SEARCH;

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

  /** */
  public getLimit(): number {
    return DefaultParamValue.LIMIT;
  }
}
