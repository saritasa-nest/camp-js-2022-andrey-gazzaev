import { Injectable } from '@angular/core';
import { TypeDto } from '@js-camp/core/dtos/anime.dto';
import { isSortField, isType } from '@js-camp/core/utils/guards/sort.guard';
import { SortDirection, SortField } from '@js-camp/core/utils/types/sort';

import { AnimeListQueryParams } from '../../models/anime-list-query-params';

/** All possible query parameters. */
enum ParamName {
  Offset = 'offset',
  Limit = 'limit',
  Ordering = 'ordering',
  TypeIn = 'type__in',
  Search = 'search',
}

/** Params mapper. */
@Injectable({ providedIn: 'root' })
export class AnimeListOptionsMapper {

  /**
   * Maps model to dto.
   * @param model AnimeListOptions model.
   */
  public toDto({
    pageSize,
    page,
    search,
    types,
    direction,
    ordering,
  }: AnimeListQueryParams): URLSearchParams {

    const sortDirection = direction === 'asc' ? SortDirection.Ascending : SortDirection.Descending;
    const sortField = isSortField(ordering) ? ordering : SortField.TitleEnglish;

    const filterType = types.every(type => isType(type)) ? types.toString() : TypeDto.Tv;

    return new URLSearchParams([
      [ParamName.Limit, String(pageSize)],
      [ParamName.Offset, String(page * pageSize)],
      [ParamName.Ordering, `${sortDirection}${sortField}`],
      [ParamName.TypeIn, filterType],
      [ParamName.Search, search],
    ]);
  }
}
