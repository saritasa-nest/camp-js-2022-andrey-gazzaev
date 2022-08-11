import { Type } from '@js-camp/core/models/anime';
import { Immerable, OmitImmerable } from '@js-camp/core/models/immerable';

/** Sort setting for anime list request. */
interface SortSetting {

  /** The field by which to sort. */
  readonly field: string;

  /** The sort direction. */
  readonly direction: string;
}

/** Filter setting for anime list request. */
interface FilterSetting {

  /** All possibly types. */
  readonly byType: Type[];
}

/** Params for for anime list request. */
export class AnimeListOptions extends Immerable {

  /** The page number to be returned. */
  public readonly pageNumber: number;

  /** Sort setting. */
  public readonly sort: SortSetting;

  /** Filter setting. */
  public readonly filter: FilterSetting;

  /** Search query. */
  public readonly search: string;

  /** Maximum number of entries per page.*/
  public readonly limit?: number;

  public constructor(data: InitArgsAnimeListOptions) {
    super();
    this.pageNumber = data.pageNumber;
    this.sort = data.sort;
    this.filter = data.filter;
    this.search = data.search;
    this.limit = data.limit;
  }
}

type InitArgsAnimeListOptions = OmitImmerable<AnimeListOptions>;
