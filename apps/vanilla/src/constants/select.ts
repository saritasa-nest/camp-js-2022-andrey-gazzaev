import { Status, Type } from '@js-camp/core/models/anime';
import { SortField } from '@js-camp/core/utils/types/sort';

import { Option } from '../types/select';

/** All possible sorting and filtering options. */
export namespace Options {

  /** Options in sort field select. */
  export const SORT_FIELD: readonly Option[] =
    [
      { text: 'Title in English', value: SortField.TitleEnglish },
      { text: 'Title in Japanese', value: SortField.TitleJapanese },
      { text: 'Aired Start', value: SortField.Aired },
    ];

  /** Options in ordering select. */
  export const ORDERING: readonly Option[] =
    [
      { text: 'Ascending', value: '' },
      { text: 'Descending', value: '-' },
    ];

  /** Options in status select. */
  export const STATUS: readonly Option[] =
    [
      { text: 'Airing', value: Status.Airing },
      { text: 'Finished', value: Status.Finished },
      { text: 'Not yet aired', value: Status.NotYetAired },
    ];

  /** Options in status select. */
  export const TYPE: readonly Option[] =
    [
      { text: 'Tv', value: Type.Tv },
      { text: 'OVA', value: Type.Ova },
      { text: 'Movie', value: Type.Movie },
      { text: 'Special', value: Type.Special },
      { text: 'ONA', value: Type.Ona },
      { text: 'Music', value: Type.Music },
    ];
}
