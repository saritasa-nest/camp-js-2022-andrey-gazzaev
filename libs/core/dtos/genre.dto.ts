export type PostGenreDto = Omit< GenreDto, 'id'>;

/** Genre DTO. */
export interface GenreDto {

  /** Id. */
  readonly id: number;

  /** Name. */
  readonly name: string;

  /** DTO type. */
  readonly type: 'GENRES';
}
