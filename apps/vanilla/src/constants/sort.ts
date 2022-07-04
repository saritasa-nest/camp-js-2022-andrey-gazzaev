import { SortOption, SortSettings } from '../types/sortSettings';

/** The key by which the sort settings are stored. */
export const LOCAL_SORT_SETTINGS = 'sortSettings';

/** Default sort settings. */
export const DEFAULT_SORT_SETTINGS: SortSettings = {
  ordering: 'title_eng',
  direction: '',
  status: 'AIRING',
};

/** Options in ordering select. */
export const OPTIONS_FOR_ORDERING: SortOption[] =
  [
    { text: 'Title in English', value: 'title_eng' },
    { text: 'Title in Japanese', value: 'title_jpn' },
    { text: 'Aired Start', value: 'aired' },
  ];

/** Options in direction select. */
export const OPTIONS_FOR_DIRECTION: SortOption[] =
  [
    { text: 'Ascending', value: '' },
    { text: 'Descending', value: '-' },
  ];

/** Options in status select. */
export const OPTIONS_FOR_STATUS: SortOption[] =
  [
    { text: 'Airing', value: 'AIRING' },
    { text: 'Finished', value: 'FINISHED' },
    { text: 'Not yet aired', value: 'NOT_YET_AIRED' },
  ];
