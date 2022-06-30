/** Describes a value аired. */
interface AiredDTO {

  /** End date Anime. */
  readonly end: Date;

  /** Start date Anime. */
  readonly start: Date;
}

/** Describes base values anime. */
interface BaseAnimeDTO {

  /** Image. */
  readonly image: string;

  /** Title in english. */
  readonly title_eng: string;

  /**  Title in Japanese. */
  readonly title_jpn: string;

  /** Release and end dates. */
  readonly aired: AiredDTO;

  /** Anime type. */
  readonly type: string;

  /** Status. */
  readonly status: string;
}

/** Extend base values anime. */
interface AnimeDTO extends BaseAnimeDTO {

  /** ID. */
  readonly id: number;

  /** Created. */
  readonly created: Date;

  /** Modified. */
  readonly modified: Date;
}

/** Describes the value that comes from the request for anime. */
export interface AnimeResponseDTO {

  /** Number of anime in the database. */
  readonly count: number;

  /** URL Next page. */
  readonly next: string | null;

  /** URL prev page. */
  readonly previous: string | null;

  /** Results. */
  readonly results: readonly AnimeDTO[];
}
