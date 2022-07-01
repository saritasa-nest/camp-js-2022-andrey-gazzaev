/** Describes a value аired. */
interface AiredDto {

  /** End date Anime. */
  readonly end: Date;

  /** Start date Anime. */
  readonly start: Date;
}

/** Extend base values anime. */
export interface AnimeDto {

  /** ID. */
  readonly id: number;

  /** Created date. */
  readonly created: Date;

  /** Modified date. */
  readonly modified: Date;

  /** Url address image. */
  readonly image: string;

  /** Title in english. */
  readonly title_eng: string;

  /**  Title in Japanese. */
  readonly title_jpn: string;

  /** Release and end dates. */
  readonly aired: AiredDto;

  /** Anime type (TV, OVA, MOVIE, SPECIAL, ONA, MUSIC). */
  readonly type: string;

  /** Anime status (airing, finished, not yet airing). */
  readonly status: string;
}
