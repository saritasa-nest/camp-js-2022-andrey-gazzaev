import { AnimeDto, StatusDto, TypeDto } from '../dtos/anime.dto';
import { AnimeBase, Status, Type } from '../models/anime';
import { AnimeDetailsDto } from '../dtos/animeDetails';
import { AnimeDetails } from '../models/animeDetails';

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
    dto: AnimeDto,
  ): AnimeBase {

    const status = ANIME_STATUS_FROM_DTO_MAP[dto.status] !== undefined ? ANIME_STATUS_FROM_DTO_MAP[dto.status] : Status.Airing;
    const type = ANIME_TYPE_FROM_DTO_MAP[dto.type] !== undefined ? ANIME_TYPE_FROM_DTO_MAP[dto.type] : Type.Tv;

    return new AnimeBase({
      id: dto.id,
      image: dto.image,
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      aired: DateRangeMapper.fromDto(dto.aired),
      status,
      type,
    });
  }

  /**
   * Maps dto to model.
   * @param dto Anime details dto.
   */
  export function fromDetailsDto(dto: AnimeDetailsDto): AnimeDetails {

    const status = ANIME_STATUS_FROM_DTO_MAP[dto.status] !== undefined ? ANIME_STATUS_FROM_DTO_MAP[dto.status] : Status.Airing;
    const type = ANIME_TYPE_FROM_DTO_MAP[dto.type] !== undefined ? ANIME_TYPE_FROM_DTO_MAP[dto.type] : Type.Tv;

    const genresData = dto.genres_data !== undefined ? dto.genres_data.map(genre => GenreMapper.fromDto(genre)) : undefined;
    const studiosData = dto.studios_data !== undefined ? dto.studios_data.map(studio => StudioMapper.fromDto(studio)) : undefined;

    return new AnimeDetails({
      id: dto.id,
      image: dto.image,
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      aired: DateRangeMapper.fromDto(dto.aired),
      status,
      type,
      airing: dto.airing ?? false,
      synopsis: dto.synopsis,
      trailerYoutubeId: dto.trailer_youtube_id,
      genresData,
      studiosData,
    });
  }
}
