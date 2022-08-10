import { AnimeDetailsDto } from './animeDetails';

/** Rating DTO. */
export enum RatingDto {
  GeneralAudiences = 'G',
  ParentalGuidance = 'PG',
  ParentsStrongly = 'PG_13',
  Restricted = 'R_17',
  RestrictedPlus = 'R_PLUS',
  RestrictedX = 'R_X',
  Unknown = 'UNKNOWN',
}

/** Season DTO. */
export enum SeasonDto {
  Summer = 'SUMMER',
  Winter = 'WINTER',
  Spring = 'SPRING',
  Fall = 'FALL',
  NonSeasonal = 'NON_SEASONAL',
}

/** Source DTO. */
export enum SourceDto {
  FourKomaManga = 'FOUR_KOMA_MANGA',
  Book = 'BOOK',
  CardGame = 'CARD_GAME',
  Game = 'GAME',
  LightNovel = 'LIGHT_NOVEL',
  Manga = 'MANGA',
  MixedMedia = 'MIXED_MEDIA',
  Music = 'MUSIC',
  Novel = 'NOVEL',
  Original = 'ORIGINAL',
  PictureBook = 'PICTURE_BOOK',
  Radio = 'RADIO',
  VisualNovel = 'VISUAL_NOVEL',
  WebManga = 'WEB_MANGA',
  WebNovel = 'WEB_NOVEL',
  Other = 'OTHER',
  Unknown = 'UNKNOWN',
}

export type CreateAnimeEditorDto = Omit<AnimeEditorDto, 'id' | 'genres_data' | 'studios_data'> ;

export interface AnimeEditorDto extends AnimeDetailsDto {

  /** Source. */
  readonly source: SourceDto;

  /** Rating. */
  readonly rating: RatingDto;

  /** Season. */
  readonly season: SeasonDto;

  /** Studios (collection of id). */
  readonly studios: readonly number[];

  /** Genres (collection of id). */
  readonly genres: readonly number[];

}
