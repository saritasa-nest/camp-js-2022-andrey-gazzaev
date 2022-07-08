import { Status } from '@js-camp/core/models/anime';

import { SortOption, SortSettings } from '../types/sortSettings';

/** Possible options ordering type. */
enum SortField {
  TitleEnglish = 'title_eng',
  TitleJapanese = 'title_jpn',
  Aired = 'aired',
}

/** Default sort settings. */
export const DEFAULT_SORT_SETTINGS: SortSettings = {
  ordering: SortField.TitleEnglish,
  direction: '',
  status: Status.Airing,
};

/** Options in ordering select. */
export const OPTIONS_FOR_ORDERING: readonly SortOption[] =
  [
    { text: 'Title in English', value: SortField.TitleEnglish },
    { text: 'Title in Japanese', value: SortField.TitleJapanese },
    { text: 'Aired Start', value: SortField.Aired },
  ];

/** Options in direction select. */
export const OPTIONS_FOR_DIRECTION: readonly SortOption[] =
  [
    { text: 'Ascending', value: '' },
    { text: 'Descending', value: '-' },
  ];

/** Options in status select. */
export const OPTIONS_FOR_STATUS: readonly SortOption[] =
  [
    { text: 'Airing', value: Status.Airing },
    { text: 'Finished', value: Status.Finished },
    { text: 'Not yet aired', value: Status.NotYetAired },
  ];
