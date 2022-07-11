import { AnimeDto } from '../dtos/anime.dto';
import { Anime, Status, Type } from '../models/anime';

import { DateRangeMapper } from './dateRange.mapper';

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   * @param mapperFromDto Callback of result mapper from DTO to Model.
   */
  export function fromDto(
    dto: AnimeDto,
  ): Anime {

    const status = Object.values(Status).includes(dto.status) ? dto.status : Status.Airing;
    const type = Object.values(Type).includes(dto.type) ? dto.type : Type.Tv;

    return new Anime({
      id: dto.id,
      image: dto.image,
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      aired: DateRangeMapper.fromDto(dto.aired),
      status,
      type,
    });

  }
}
