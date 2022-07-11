import { Status } from '@js-camp/core/models/anime';
import { SortField } from '@js-camp/core/utils/types/sort';

import { Option } from '../types/select';

/** Options in sort field select. */
export const OPTIONS_FOR_SORT_FIELD: readonly Option[] =
  [
    { text: 'Title in English', value: SortField.TitleEnglish },
    { text: 'Title in Japanese', value: SortField.TitleJapanese },
    { text: 'Aired Start', value: SortField.Aired },
  ];

/** Options in ordering select. */
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
