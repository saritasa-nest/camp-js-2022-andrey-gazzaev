import { Status } from '@js-camp/core/models/anime';

import { Option, PaginationOptions, SortField, SortOrdering } from '../types/paginationSettings';

/** Anime limit when requesting a new page. */
const DEFAULT_LIMIT = 25;

export const FIRST_PAGE_NUMBER = 1;

/** Default sort settings. */
export const DEFAULT_PAGINATION_SETTINGS: PaginationOptions = {
  sort: {
    field: SortField.Aired,
    ordering: SortOrdering.Ascending,
  },
  filter: {
    byStatusField: Status.Airing,
  },
  limit: DEFAULT_LIMIT,
};

/** Options in ordering select. */
export const OPTIONS_FOR_SORT_FIELD: readonly Option[] =
  [
    { text: 'Title in English', value: SortField.TitleEnglish },
    { text: 'Title in Japanese', value: SortField.TitleJapanese },
    { text: 'Aired Start', value: SortField.Aired },
  ];

/** Options in direction select. */
export const OPTIONS_FOR_ORDERING: readonly Option[] =
  [
    { text: 'Ascending', value: '' },
    { text: 'Descending', value: '-' },
  ];

/** Options in status select. */
export const OPTIONS_FOR_STATUS: readonly Option[] =
  [
    { text: 'Airing', value: Status.Airing },
    { text: 'Finished', value: Status.Finished },
    { text: 'Not yet aired', value: Status.NotYetAired },
  ];
