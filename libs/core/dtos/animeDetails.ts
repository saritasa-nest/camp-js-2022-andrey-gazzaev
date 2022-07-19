import { AnimeDto } from './anime.dto';
import { GenreDto } from './genre.dto';
import { StudioDto } from './studio.dto';

export interface AnimeDetailsDto extends AnimeDto {

  /** List of anime genres. */
  readonly genres_data?: readonly GenreDto[];

  /** List of anime producing studios. */
  readonly studios_data?: readonly StudioDto[];

  /** It's on the air. */
  readonly airing?: boolean;

  /** Anime trailer URL.. */
  readonly trailer_youtube_id?: string;

  /** Short review about anime. */
  readonly synopsis?: string;
}
