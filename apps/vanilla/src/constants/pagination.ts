import { AnimeEnums } from '@js-camp/core/utils/types/anime.enums';
import { SortField, SortOrdering } from '@js-camp/core/utils/types/sort';

import { QueryOptions } from '../types/animeSettings';

/** Anime limit when requesting a new page. */
const DEFAULT_LIMIT = 25;

/** Default search settings. */
const DEFAULT_SEARCH = '';

/** First pagination page. */
export const FIRST_PAGE_NUMBER = 1;

/** Default sort settings. */
export const DEFAULT_ANIME_SETTINGS: QueryOptions = {
  sort: {
    field: SortField.Aired,
    ordering: SortOrdering.Ascending,
  },
  filter: {
    byStatusField: AnimeEnums.Status.Airing,
  },
  limit: DEFAULT_LIMIT,
  search: DEFAULT_SEARCH,
};
