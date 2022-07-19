import { AnimeBase } from './anime';
import { Genre } from './genre';
import { OmitImmerable } from './immerable';
import { Studio } from './studio.dto';

/** Anime details. */
export class AnimeDetails extends AnimeBase {

  /** List of anime genres. */
  public readonly genresData: readonly Genre[];

  /** List of anime producing studios. */
  public readonly studiosData: readonly Studio[];

  /** It's on the air. */
  public readonly airing: boolean;

  /** Anime trailer URL.. */
  public readonly trailerYoutubeId: string | null;

  /** Short review about anime. */
  public readonly synopsis: string;

  public constructor(data: InitArgsAnimeDetails) {
    super(data);
    this.genresData = data.genresData;
    this.studiosData = data.studiosData;
    this.airing = data.airing;
    this.trailerYoutubeId = data.trailerYoutubeId;
    this.synopsis = data.synopsis;
  }
}

type InitArgsAnimeDetails = OmitImmerable<AnimeDetails>;
