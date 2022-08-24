import { AnimeBaseDto } from './anime.dto';
import { GenreDto } from './genre.dto';
import { StudioDto } from './studio.dto';

export interface AnimeDetailsDto extends AnimeBaseDto {

  /** List of anime genres. */
  readonly genres_data: readonly GenreDto[];

  /** List of anime producing studios. */
  readonly studios_data: readonly StudioDto[];

  /** Whether it is airing. */
  readonly airing: boolean;

  /** Anime trailer ID. */
  readonly trailer_youtube_id: string | null;

  /** Short review about anime. */
  readonly synopsis: string;

  /** Studios (collection of id). */
  readonly studios: readonly number[];

  /** Genres (collection of id). */
  readonly genres: readonly number[];
}
