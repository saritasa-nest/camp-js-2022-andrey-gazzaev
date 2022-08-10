import { AnimeDetails } from './animeDetails';
import { OmitImmerable } from './immerable';

/** Possible options anime season. */
export enum Season {
  Summer = 'Summer',
  Winter = 'Winter',
  Spring = 'Spring',
  Fall = 'Fall',
  NonSeasonal = 'None seasonal',
}

/** Possible options anime rating. */
export enum Rating {
  GeneralAudiences = 'G',
  ParentalGuidance = 'PG',
  ParentsStrongly = 'PG-13',
  Restricted = 'R-17',
  RestrictedPlus = 'R-PLUS',
  RestrictedX = 'R-X',
  Unknown = 'Unknown',
}

/** Possible options anime source. */
export enum Source {
  FourKomaManga = 'Four koma manga',
  Book = 'Book',
  CardGame = 'Card game',
  Game = 'game',
  LightNovel = 'Light novel',
  Manga = 'Manga',
  MixedMedia = 'Mixed media',
  Music = 'Music',
  Novel = 'Novel',
  Original = 'Original',
  PictureBook = 'Picture book',
  Radio = 'Radio',
  VisualNovel = 'Visual novel',
  WebManga = 'Web manga',
  WebNovel = 'Web novel',
  Other = 'Other',
  Unknown = 'Unknown',
}

export type PostAnime = Omit<AnimeEditor, 'id' | 'genresData' | 'studiosData' | 'imageTitle'>;
export type AnimeInformation = Omit<AnimeEditor, 'id' | 'genresData' | 'studiosData' | 'imageTitle' | 'image' | 'aired'>;

/** Anime editor. */
export class AnimeEditor extends AnimeDetails {

  /** Source. */
  public readonly source: Source;

  /** Rating. */
  public readonly rating: Rating;

  /** Season. */
  public readonly season: Season;

  /** Season. */
  public readonly studios: number[];

  /** Season. */
  public readonly genres: number[];

  public constructor(data: InitArgsAnimeEditor) {
    super(data);
    this.source = data.source;
    this.rating = data.rating;
    this.season = data.season;
    this.studios = data.studios;
    this.genres = data.genres;
  }
}

type InitArgsAnimeEditor = OmitImmerable<AnimeEditor>;