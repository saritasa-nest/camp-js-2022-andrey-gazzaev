/**
 * Describes a value аired.
 */
interface IAiredDTO {

  /**
   * End Anime.
   */
  readonly end: Date;

  /**
   * Start Anime.
   */
  readonly start: Date;
}

/**
 * Describes base values anime.
 */
interface IBaseAnimeDTO {

  /**
   * Image.
   */
  readonly image: string;

  /**
   * Title in english.
   */
  readonly title_eng: string;

  /**
   * Title in Japanese.
   */
  readonly title_jpn: string;

  /**
   * Release and end dates.
   */
  readonly aired: IAiredDTO;

  /**
   * Anime type.
   */
  readonly type: string;

  /**
   * Status.
   */
  readonly status: string;
}

/**
 * Extend base values anime .
 */
interface IAnimeDTO extends IBaseAnimeDTO {

  /**
   * ID.
   */
  readonly id: number;

  /**
   * Created.
   */
  readonly created: Date;

  /**
   * Modified.
   */
  readonly modified: Date;
}

/**
 * Describes the value that comes from the request for anime.
 */
export interface IAnimeResponseDTO {

  /**
   * Number of anime in the database.
   */
  readonly count: number;

  /**
   * URL Next page.
   */
  readonly next: string | null;

  /**
   * URL prev page.
   */
  readonly previous: string | null;

  /**
   * Results.
   */
  readonly results: readonly IAnimeDTO[];
}
