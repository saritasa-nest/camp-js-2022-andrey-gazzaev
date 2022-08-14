/** INformation about poster. */
export interface PosterData {

  /** Object file. */
  readonly file: File | null;

  /** File name. */
  readonly fileName: string | null;

  /** Poster URL. */
  readonly url: string | null;
}
