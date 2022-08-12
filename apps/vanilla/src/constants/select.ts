import { AnimeStatus, AnimeType } from '@js-camp/core/models/anime';
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
      { text: 'Status', value: SortField.Status },
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
      { text: 'All', value: '' },
      { text: 'Airing', value: AnimeStatus.Airing },
      { text: 'Finished', value: AnimeStatus.Finished },
      { text: 'Not yet aired', value: AnimeStatus.NotYetAired },
    ];

  /** Options in status select. */
  export const TYPE: readonly Option[] =
    [
      { text: 'All', value: '' },
      { text: 'Tv', value: AnimeType.Tv },
      { text: 'OVA', value: AnimeType.Ova },
      { text: 'Movie', value: AnimeType.Movie },
      { text: 'Special', value: AnimeType.Special },
      { text: 'ONA', value: AnimeType.Ona },
      { text: 'Music', value: AnimeType.Music },
    ];
}
