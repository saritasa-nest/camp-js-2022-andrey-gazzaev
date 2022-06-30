import { AnimeResponseDTO } from '../dtos/anime.dto';
import { Aired, Anime, AnimeResponse } from '../models/anime';

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeResponseDTO): AnimeResponse {
    const results = dto.results.map(animeDto => {
      const aired = new Aired({
        end: animeDto.aired.end,
        start: animeDto.aired.start,
      });

      return new Anime({
        aired,
        created: animeDto.created,
        id: animeDto.id,
        image: animeDto.image,
        modified: animeDto.modified,
        status: animeDto.status,
        titleEng: animeDto.title_eng,
        titleJpn: animeDto.title_jpn,
        type: animeDto.type,
      });
    });

    return new AnimeResponse({
      count: dto.count,
      next: dto.next,
      previous: dto.previous,
      results,
    });
  }
}
