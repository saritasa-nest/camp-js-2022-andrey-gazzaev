import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';
import { AnimeEnums } from '../utils/types/animeEnums';

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

    const status = Object.values(AnimeEnums.Status).includes(dto.status) ? dto.status : AnimeEnums.Status.Airing;
    const type = Object.values(AnimeEnums.Type).includes(dto.type) ? dto.type : AnimeEnums.Type.Tv;

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
