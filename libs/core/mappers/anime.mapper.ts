import { AnimeDto } from '../dtos/anime.dto';
import { Anime, DateRange, Status, Type } from '../models/anime';

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeDto): Anime {

    const aired = new DateRange({
      end: new Date(dto.aired.end),
      start: new Date(dto.aired.start),
    });

    const status = dto.status in Status ? dto.status as Status : Status.Airing;
    const type = dto.type in Type ? dto.type as Type : Type.Tv;

    return new Anime({
      id: dto.id,
      image: dto.image,
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      aired,
      status,
      type,
    });

  }
}
