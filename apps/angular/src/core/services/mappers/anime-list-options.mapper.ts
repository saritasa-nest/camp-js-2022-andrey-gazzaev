import { Injectable } from '@angular/core';

import { SortField } from '@js-camp/core/models/anime';
import { ANIME_TYPE_TO_DTO_MAP } from '@js-camp/core/mappers/anime.mapper';
import { SortDirectionDto, SortFieldDto } from '@js-camp/core/dtos/anime.dto';

import { AnimeListQueryParams } from '../../models/anime-list-query-params';

/** All possible query parameters. */
enum ParamName {
  Offset = 'offset',
  Limit = 'limit',
  Ordering = 'ordering',
  TypeIn = 'type__in',
  Search = 'search',
}

export const SORT_FIELD_TO_DTO_MAP: Readonly<Record< SortField, SortFieldDto>> = {
  [SortField.TitleEnglish]: SortFieldDto.TitleEnglish,
  [SortField.TitleJapanese]: SortFieldDto.TitleJapanese,
  [SortField.Aired]: SortFieldDto.Aired,
  [SortField.Status]: SortFieldDto.Status,
};

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
    sort,
  }: AnimeListQueryParams): URLSearchParams {

    const sortDirection = sort.direction === 'asc' ? SortDirectionDto.Ascending : SortDirectionDto.Descending;
    const sortField = SORT_FIELD_TO_DTO_MAP[sort.field] !== undefined ? SORT_FIELD_TO_DTO_MAP[sort.field] : SortField.TitleEnglish;

    const filterType = types.map(type => ANIME_TYPE_TO_DTO_MAP[type]).toString();

    return new URLSearchParams([
      [ParamName.Limit, String(pageSize)],
      [ParamName.Offset, String(page * pageSize)],
      [ParamName.Ordering, `${sortDirection}${sortField}`],
      [ParamName.TypeIn, filterType],
      [ParamName.Search, search],
    ]);
  }
}
