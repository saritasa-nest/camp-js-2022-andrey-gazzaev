import { AnimeSortField } from '../models/anime';
import { SortDirectionDto, SortFieldDto } from '../dtos/anime.dto';
import { AnimeListQueryParams } from '../models/anime-list-query-params';

import { ANIME_TYPE_TO_DTO_MAP } from './anime.mapper';

/** All possible query parameters. */
enum ParamName {
  Offset = 'offset',
  Limit = 'limit',
  Ordering = 'ordering',
  TypeIn = 'type__in',
  Search = 'search',
}

export const SORT_FIELD_TO_DTO_MAP: Readonly<Record<AnimeSortField, SortFieldDto>> = {
  [AnimeSortField.TitleEnglish]: SortFieldDto.TitleEnglish,
  [AnimeSortField.TitleJapanese]: SortFieldDto.TitleJapanese,
  [AnimeSortField.Aired]: SortFieldDto.Aired,
  [AnimeSortField.Status]: SortFieldDto.Status,
};

export namespace AnimeListOptionsMapper {

  /**
   * Maps model to dto.
   * @param model AnimeListOptions model.
   */
  export function toDto({
    pageSize,
    page,
    search,
    types,
    sort,
  }: AnimeListQueryParams): URLSearchParams {

    const sortDirection = sort.direction === 'asc' ? SortDirectionDto.Ascending : SortDirectionDto.Descending;
    const sortField = SORT_FIELD_TO_DTO_MAP[sort.field] !== undefined ? SORT_FIELD_TO_DTO_MAP[sort.field] : SortFieldDto.TitleEnglish;

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
