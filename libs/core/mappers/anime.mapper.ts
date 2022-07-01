import { AnimeDto } from '../dtos/anime.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import { Aired, Anime } from '../models/anime';
import { Pagination } from '../models/pagination';

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: PaginationDto<AnimeDto>): Pagination<Anime> {
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

    return new Pagination<Anime>({
      count: dto.count,
      next: dto.next,
      previous: dto.previous,
      results,
    });
  }
}
