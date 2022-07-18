import { AnimeDto, StatusDto, TypeDto } from '../dtos/anime.dto';
import { Anime, Status, Type } from '../models/anime';
import { isNotFalsy } from '../utils/guards/general.guard';

import { DateRangeMapper } from './dateRange.mapper';

const ANIME_STATUS_FROM_DTO_MAP: Readonly<Record<StatusDto, Status>> = {
  [StatusDto.Airing]: Status.Airing,
  [StatusDto.Finished]: Status.Finished,
  [StatusDto.NotYetAired]: Status.NotYetAired,
};

const ANIME_TYPE_FROM_DTO_MAP: Readonly<Record<TypeDto, Type>> = {
  [TypeDto.Movie]: Type.Movie,
  [TypeDto.Music]: Type.Music,
  [TypeDto.Ona]: Type.Ona,
  [TypeDto.Ova]: Type.Ova,
  [TypeDto.Special]: Type.Special,
  [TypeDto.Tv]: Type.Tv,
};

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(
    dto: AnimeDto,
  ): Anime {

    const status = isNotFalsy(ANIME_STATUS_FROM_DTO_MAP[dto.status]) ? ANIME_STATUS_FROM_DTO_MAP[dto.status] : Status.Airing;
    const type = isNotFalsy(ANIME_TYPE_FROM_DTO_MAP[dto.type]) ? ANIME_TYPE_FROM_DTO_MAP[dto.type] : Type.Tv;

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
