import { AnimeDetailsDto } from '../dtos/animeDetails';
import { AnimeDetails } from '../models/animeDetails';
import { AnimeBaseDto, StatusDto, TypeDto } from '../dtos/anime.dto';
import { AnimeBase, Status, Type } from '../models/anime';
import { isDefine } from '../utils/guards/general.guard';

import { GenreMapper } from './genre.mapper';
import { StudioMapper } from './studio.mapper';
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
    dto: AnimeBaseDto,
  ): AnimeBase {

    if (!isDefine(ANIME_STATUS_FROM_DTO_MAP[dto.status])) {
      throw new Error(`Unknown value: ${dto.status}`);
    }

    if (!isDefine(ANIME_TYPE_FROM_DTO_MAP[dto.type])) {
      throw new Error(`Unknown value: ${dto.type}`);
    }

    return new AnimeBase({
      id: dto.id,
      image: dto.image,
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      aired: DateRangeMapper.fromDto(dto.aired),
      status: ANIME_STATUS_FROM_DTO_MAP[dto.status],
      type: ANIME_TYPE_FROM_DTO_MAP[dto.type],
    });
  }

  /**
   * Maps dto to model.
   * @param dto Anime details dto.
   */
  export function fromDetailsDto(dto: AnimeDetailsDto): AnimeDetails {

    if (!isDefine(ANIME_STATUS_FROM_DTO_MAP[dto.status])) {
      throw new Error(`Unknown value: ${dto.status}`);
    }

    if (!isDefine(ANIME_TYPE_FROM_DTO_MAP[dto.type])) {
      throw new Error(`Unknown value: ${dto.type}`);
    }

    const genresData = dto.genres_data !== undefined ? dto.genres_data.map(genre => GenreMapper.fromDto(genre)) : undefined;
    const studiosData = dto.studios_data !== undefined ? dto.studios_data.map(studio => StudioMapper.fromDto(studio)) : undefined;

    return new AnimeDetails({
      id: dto.id,
      image: dto.image,
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      aired: DateRangeMapper.fromDto(dto.aired),
      status: ANIME_STATUS_FROM_DTO_MAP[dto.status],
      type: ANIME_TYPE_FROM_DTO_MAP[dto.type],
      airing: dto.airing ?? false,
      synopsis: dto.synopsis,
      trailerYoutubeId: dto.trailer_youtube_id,
      genresData,
      studiosData,
    });
  }
}
