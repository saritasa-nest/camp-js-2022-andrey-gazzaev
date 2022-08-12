import { AnimeDetailsDto } from '../dtos/animeDetails';
import { AnimeDetails } from '../models/animeDetails';
import { AnimeBaseDto, StatusDto, TypeDto } from '../dtos/anime.dto';
import { AnimeBase, AnimeStatus, AnimeType } from '../models/anime';
import { isDefined } from '../utils/guards/general.guard';

import { GenreMapper } from './genre.mapper';
import { StudioMapper } from './studio.mapper';
import { DateRangeMapper } from './dateRange.mapper';

const ANIME_STATUS_FROM_DTO_MAP: Readonly<Record<StatusDto, AnimeStatus>> = {
  [StatusDto.Airing]: AnimeStatus.Airing,
  [StatusDto.Finished]: AnimeStatus.Finished,
  [StatusDto.NotYetAired]: AnimeStatus.NotYetAired,
};

const ANIME_TYPE_FROM_DTO_MAP: Readonly<Record<TypeDto, AnimeType>> = {
  [TypeDto.Movie]: AnimeType.Movie,
  [TypeDto.Music]: AnimeType.Music,
  [TypeDto.Ona]: AnimeType.Ona,
  [TypeDto.Ova]: AnimeType.Ova,
  [TypeDto.Special]: AnimeType.Special,
  [TypeDto.Tv]: AnimeType.Tv,
};

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(
    dto: AnimeBaseDto,
  ): AnimeBase {
    if (!isDefined(ANIME_STATUS_FROM_DTO_MAP[dto.status])) {
      throw new Error(`Unknown value: ${dto.status}`);
    }

    if (!isDefined(ANIME_TYPE_FROM_DTO_MAP[dto.type])) {
      throw new Error(`Unknown value: ${dto.type}`);
    }

    return new AnimeBase({
      id: dto.id,
      image: dto.image,
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      imageTitle: dto.title_eng || dto.title_jpn || 'no title',
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
    if (!isDefined(ANIME_STATUS_FROM_DTO_MAP[dto.status])) {
      throw new Error(`Unknown value: ${dto.status}`);
    }

    if (!isDefined(ANIME_TYPE_FROM_DTO_MAP[dto.type])) {
      throw new Error(`Unknown value: ${dto.type}`);
    }

    const genresData = dto.genres_data.map(genre => GenreMapper.fromDto(genre));
    const studiosData = dto.studios_data.map(studio => StudioMapper.fromDto(studio));

    return new AnimeDetails({
      ...AnimeMapper.fromDto(dto),
      isAiring: dto.airing ?? false,
      synopsis: dto.synopsis,
      trailerYoutubeId: dto.trailer_youtube_id,
      genresData,
      studiosData,
    });
  }
}
