import { Genre } from '../models/genre';
import { GenreDto, PostGenreDto } from '../dtos/genre.dto';

export namespace GenreMapper {

  /**
   * Maps dto to model.
   * @param dto Genre dto.
   */
  export function fromDto(dto: GenreDto): Genre {
    return new Genre({
      id: dto.id,
      name: dto.name,
    });
  }

  /**
   * Maps model to dto.
   * @param name Genre name.
   */
  export function toDto(name: string): PostGenreDto {
    return {
      name,
      type: 'GENRES',
    };
  }
}
