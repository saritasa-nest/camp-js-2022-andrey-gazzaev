/**
 * Describes a value аired.
 */
export interface IAired {

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
export interface IBaseAnime {
  readonly [index: string]: string | number | Date | IAired;

  /**
   * Image.
   */
  readonly image: string;

  /**
   * Title in english.
   */
  readonly titleEng: string;

  /**
   * Title in Japanese.
   */
  readonly titleJpn: string;

  /**
   * Release and end dates.
   */
  readonly aired: IAired;

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
export interface IAnime extends IBaseAnime {

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
export interface IAnimeResponse {

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
  readonly results: IAnime[];
}
