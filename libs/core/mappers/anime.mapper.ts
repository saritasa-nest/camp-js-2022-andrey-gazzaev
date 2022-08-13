/* eslint-disable @typescript-eslint/naming-convention */
import { AnimeDetailsDto } from '../dtos/animeDetails';
import { AnimeDetails } from '../models/animeDetails';
import { AnimeBase, AnimeStatus, AnimeType } from '../models/anime';
import { isDefined } from '../utils/guards/general.guard';
import { AnimeBaseDto, StatusDto, TypeDto } from '../dtos/anime.dto';
import { PostAnime, Rating, Season, Source } from '../models/anime-editor';
import { PostAnimeDto, RatingDto, SeasonDto, SourceDto } from '../dtos/anime-editor.dto';

import { GenreMapper } from './genre.mapper';
import { StudioMapper } from './studio.mapper';
import { DateRangeMapper } from './dateRange.mapper';

const ANIME_STATUS_FROM_DTO_MAP: Readonly<Record<StatusDto, AnimeStatus>> = {
  [StatusDto.Airing]: AnimeStatus.Airing,
  [StatusDto.Finished]: AnimeStatus.Finished,
  [StatusDto.NotYetAired]: AnimeStatus.NotYetAired,
};

const ANIME_STATUS_TO_DTO_MAP: Readonly<Record<AnimeStatus, StatusDto>> = {
  [AnimeStatus.Airing]: StatusDto.Airing,
  [AnimeStatus.Finished]: StatusDto.Finished,
  [AnimeStatus.NotYetAired]: StatusDto.NotYetAired,
};

const ANIME_TYPE_TO_DTO_MAP: Readonly<Record<AnimeType, TypeDto>> = {
  [AnimeType.Movie]: TypeDto.Movie,
  [AnimeType.Music]: TypeDto.Music,
  [AnimeType.Ona]: TypeDto.Ona,
  [AnimeType.Ova]: TypeDto.Ova,
  [AnimeType.Special]: TypeDto.Special,
  [AnimeType.Tv]: TypeDto.Tv,
};

const ANIME_TYPE_FROM_DTO_MAP: Readonly<Record<TypeDto, AnimeType>> = {
  [TypeDto.Movie]: AnimeType.Movie,
  [TypeDto.Music]: AnimeType.Music,
  [TypeDto.Ona]: AnimeType.Ona,
  [TypeDto.Ova]: AnimeType.Ova,
  [TypeDto.Special]: AnimeType.Special,
  [TypeDto.Tv]: AnimeType.Tv,
};

const ANIME_SOURCE_TO_DTO_MAP: Readonly<Record<Source, SourceDto>> = {
  [Source.Book]: SourceDto.Book,
  [Source.CardGame]: SourceDto.CardGame,
  [Source.FourKomaManga]: SourceDto.FourKomaManga,
  [Source.Game]: SourceDto.Game,
  [Source.LightNovel]: SourceDto.LightNovel,
  [Source.Manga]: SourceDto.Manga,
  [Source.MixedMedia]: SourceDto.MixedMedia,
  [Source.Music]: SourceDto.Music,
  [Source.Novel]: SourceDto.Novel,
  [Source.Original]: SourceDto.Original,
  [Source.Other]: SourceDto.Other,
  [Source.PictureBook]: SourceDto.PictureBook,
  [Source.Radio]: SourceDto.Radio,
  [Source.Unknown]: SourceDto.Unknown,
  [Source.VisualNovel]: SourceDto.VisualNovel,
  [Source.WebManga]: SourceDto.WebManga,
  [Source.WebNovel]: SourceDto.WebNovel,
};

const ANIME_RATING_TO_DTO_MAP: Readonly<Record<Rating, RatingDto>> = {
  [Rating.GeneralAudiences]: RatingDto.GeneralAudiences,
  [Rating.ParentalGuidance]: RatingDto.ParentalGuidance,
  [Rating.ParentsStrongly]: RatingDto.ParentsStrongly,
  [Rating.Restricted]: RatingDto.Restricted,
  [Rating.RestrictedPlus]: RatingDto.RestrictedPlus,
  [Rating.RestrictedX]: RatingDto.RestrictedX,
  [Rating.Unknown]: RatingDto.Unknown,
};

const ANIME_SEASON_TO_DTO_MAP: Readonly<Record<Season, SeasonDto>> = {
  [Season.Fall]: SeasonDto.Fall,
  [Season.NonSeasonal]: SeasonDto.NonSeasonal,
  [Season.Spring]: SeasonDto.Spring,
  [Season.Summer]: SeasonDto.Summer,
  [Season.Winter]: SeasonDto.Winter,
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
      imageTitle: dto.title_eng ?? dto.title_jpn ?? 'no title',
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

  /**
   * Maps model to dto.
   * @param model AnimeEditor.
   */
  export function toEditorDto(model: PostAnime): PostAnimeDto {
    if (!isDefined(ANIME_STATUS_TO_DTO_MAP[model.status])) {
      throw new Error(`Unknown value: ${model.status}`);
    }

    if (!isDefined(ANIME_TYPE_TO_DTO_MAP[model.type])) {
      throw new Error(`Unknown value: ${model.type}`);
    }

    if (!isDefined(ANIME_SOURCE_TO_DTO_MAP[model.source])) {
      throw new Error(`Unknown value: ${model.source}`);
    }

    if (!isDefined(ANIME_RATING_TO_DTO_MAP[model.rating])) {
      throw new Error(`Unknown value: ${model.rating}`);
    }

    if (!isDefined(ANIME_SEASON_TO_DTO_MAP[model.season])) {
      throw new Error(`Unknown value: ${model.season}`);
    }

    return {
      image: model.image,
      trailer_youtube_id: model.trailerYoutubeId,
      title_eng: model.titleEnglish,
      title_jpn: model.titleJapanese,
      type: ANIME_TYPE_TO_DTO_MAP[model.type],
      status: ANIME_STATUS_TO_DTO_MAP[model.status],
      source: ANIME_SOURCE_TO_DTO_MAP[model.source],
      airing: model.isAiring,
      aired: DateRangeMapper.toDto(model.aired),
      rating: ANIME_RATING_TO_DTO_MAP[model.rating],
      season: ANIME_SEASON_TO_DTO_MAP[model.season],
      synopsis: model.synopsis,
      studios: model.studios,
      genres: model.genres,
    };
  }
}
