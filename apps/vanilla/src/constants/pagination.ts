import { AnimeStatus, AnimeType } from '@js-camp/core/models/anime';
import { SortField, SortOrdering } from '@js-camp/core/utils/types/sort';

import { PaginationOptions } from '../types/paginationSettings';

/** Anime limit when requesting a new page. */
const DEFAULT_LIMIT = 25;

/** Anime offset when requesting a new page. */
export const DEFAULT_OFFSET = 0;

/** First pagination page. */
export const FIRST_PAGE_NUMBER = 1;

/** Default sort settings. */
export const DEFAULT_PAGINATION_SETTINGS: PaginationOptions = {
  sort: {
    field: SortField.Aired,
    ordering: SortOrdering.Ascending,
  },
  filter: {
    byTypeField: AnimeType.Tv,
    byStatusField: AnimeStatus.Airing,
  },
  limit: DEFAULT_LIMIT,
  offset: DEFAULT_OFFSET,
};
