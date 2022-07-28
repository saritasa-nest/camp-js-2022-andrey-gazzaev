import { AnimeListQueryDto } from '../dtos/anime-list-query.dto';
import { isSortField, isType } from '../utils/guards/sort.guard';
import { AnimeListQuery } from '../utils/interfaces/anime.interface';
import { SortField, SortDirection } from '../utils/types/sort';

export namespace AnimeListQueryMapper {

  /**
   * Maps dto to model.
   * @param model Anime list query model.
   */
  export function toDto({ pageNumber, sort, filter, search, limit }: AnimeListQuery): AnimeListQueryDto {
    const direction = sort.direction === 'asc' ? SortDirection.Ascending : SortDirection.Descending;
    const sortField = isSortField(sort.field) ? sort.field : SortField.TitleEnglish;
    const ordering = `${direction}${sortField}`;

    const filterType = filter.byType.every(type => isType(type)) ? filter.byType.toString() : '';

    return {
      limit,
      offset: pageNumber * limit,
      ordering,
      type: filterType,
      search,
    };

  }
}
