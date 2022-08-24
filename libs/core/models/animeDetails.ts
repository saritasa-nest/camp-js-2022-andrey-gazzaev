import { AnimeBase } from './anime';
import { Genre } from './genre';
import { OmitImmerable } from './immerable';
import { Studio } from './studio';

/** Anime details. */
export class AnimeDetails extends AnimeBase {

  /** Genres ids. */
  public readonly genres: readonly number[];

  /** Studios ids. */
  public readonly studios: readonly number[];

  /** List of anime genres. */
  public readonly genresData: readonly Genre[];

  /** List of anime producing studios. */
  public readonly studiosData: readonly Studio[];

  /** Whether it is airing. */
  public readonly isAiring: boolean;

  /** Anime trailer ID. */
  public readonly trailerYoutubeId: string | null;

  /** Short review about anime. */
  public readonly synopsis: string;

  public constructor(data: InitArgsAnimeDetails) {
    super(data);
    this.genresData = data.genresData;
    this.studiosData = data.studiosData;
    this.isAiring = data.isAiring;
    this.trailerYoutubeId = data.trailerYoutubeId;
    this.synopsis = data.synopsis;
    this.studios = data.studios;
    this.genres = data.genres;
  }
}

type InitArgsAnimeDetails = OmitImmerable<AnimeDetails>;
