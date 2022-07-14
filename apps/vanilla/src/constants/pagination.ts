import { AnimeEnums } from '@js-camp/core/utils/types/anime.enums';
import { SortField, SortOrdering } from '@js-camp/core/utils/types/sort';

import { PaginationOptions } from '../types/paginationSettings';

/** Anime limit when requesting a new page. */
const DEFAULT_LIMIT = 25;

/** First pagination page. */
export const FIRST_PAGE_NUMBER = 1;

/** Default sort settings. */
export const DEFAULT_PAGINATION_SETTINGS: PaginationOptions = {
  sort: {
    field: SortField.Aired,
    ordering: SortOrdering.Ascending,
  },
  filter: {
    byStatusField: AnimeEnums.Status.Airing,
  },
  limit: DEFAULT_LIMIT,
  offset: 0,
};
