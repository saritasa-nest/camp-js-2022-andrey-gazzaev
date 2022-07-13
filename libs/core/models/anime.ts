import { DateRange } from './dateRange';
import { Immerable, OmitImmerable } from './immerable';
import { Genre } from './genre';
import { Studio } from './studio.dto';

/** Possible options anime type. */
export enum Type {
  Tv = 'TV',
  Ova = 'OVA',
  Movie = 'MOVIE',
  Special = 'SPECIAL',
  Ona = 'ONA',
  Music = 'MUSIC',
}

/** Possible options anime status. */
export enum Status {
  Airing = 'AIRING',
  Finished = 'FINISHED',
  NotYetAired = 'NOT_YET_AIRED',
}

/** Anime. */
export class Anime extends Immerable {

  /** ID. */
  public readonly id: number;

  /** Url address image. */
  public readonly image: string;

  /** Title in English. */
  public readonly titleEnglish: string;

  /** Title in Japanese. */
  public readonly titleJapanese: string;

  /** Release start and end dates. */
  public readonly aired: DateRange;

  /** Anime type. */
  public readonly type: Type;

  /** Anime status. */
  public readonly status: Status;

  /** List of anime genres. */
  public readonly genresData?: readonly Genre[];

  /** List of anime producing studios. */
  public readonly studiosData?: readonly Studio[];

  /** It's on the air. */
  public readonly airing?: boolean;

  /** Anime trailer URL.. */
  public readonly trailerYoutubeId?: string | null;

  /** Short review about anime. */
  public readonly synopsis?: string;

  public constructor(data: InitArgsAnime) {
    super();
    this.id = data.id;
    this.image = data.image;
    this.titleEnglish = data.titleEnglish;
    this.titleJapanese = data.titleJapanese;
    this.aired = data.aired;
    this.type = data.type;
    this.status = data.status;
    this.genresData = data.genresData;
    this.studiosData = data.studiosData;
    this.airing = data.airing;
    this.trailerYoutubeId = data.trailerYoutubeId;
    this.synopsis = data.synopsis;
  }
}

type InitArgsAnime = OmitImmerable<Anime>;
