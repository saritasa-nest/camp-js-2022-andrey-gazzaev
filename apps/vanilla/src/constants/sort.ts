import { SortSettings } from '../types/sortSettings';

export const LOCAL_SORT_SETTINGS = 'sortSettings';
export const DEFAULT_SORT_SETTINGS: SortSettings = {
  ordering: 'title_eng',
  direction: '',
  status: 'AIRING',
};

export const DEFAULT_OPTIONS_FOR_ORDERING =
  [
    { text: 'Title in English', value: 'title_eng' },
    { text: 'Title in Japanese', value: 'title_jpn' },
    { text: 'Aired Start', value: 'aired' },
  ];

export const DEFAULT_OPTIONS_FOR_DIRECTION =
  [
    { text: 'Ascending', value: '' },
    { text: 'Descending', value: '-' },
  ];

export const DEFAULT_OPTIONS_FOR_STATUS =
  [
    { text: 'Airing', value: 'AIRING' },
    { text: 'Finished', value: 'FINISHED' },
    { text: 'Not yet aired', value: 'NOT_YET_AIRED' },
  ];
