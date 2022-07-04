import { AnimeDto } from '../dtos/anime.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import { Aired, Anime, Status, Type } from '../models/anime';
import { Pagination } from '../models/pagination';

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: PaginationDto<AnimeDto>): Pagination<Anime> {
    const results = dto.results.map(animeDto => {
      const aired = new Aired({
        end: new Date(animeDto.aired.end),
        start: new Date(animeDto.aired.start),
      });

      const status = animeDto.status in Status ? animeDto.status as Status : Status.Airing;
      const type = animeDto.type in Type ? animeDto.type as Type : Type.Tv;

      return new Anime({
        id: animeDto.id,
        created: new Date(animeDto.created),
        modified: new Date(animeDto.modified),
        image: animeDto.image,
        titleEng: animeDto.title_eng,
        titleJpn: animeDto.title_jpn,
        aired,
        status,
        type,
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
