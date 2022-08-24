/* eslint-disable @typescript-eslint/naming-convention */
import { AnimeDetailsDto } from '../dtos/animeDetails';
import { AnimeDetails } from '../models/animeDetails';
import { AnimeBaseDto, AnimeStatusDto, AnimeTypeDto } from '../dtos/anime.dto';
import { AnimeBase, AnimeStatus, AnimeType } from '../models/anime';
import { isDefined } from '../utils/guards/general.guard';
import { AnimeEditor, CreateAnime, Rating, Season, Source, UpdateAnime } from '../models/anime-editor';
import { AnimeEditorDto, PostAnimeDto, PutAnimeDto, RatingDto, SeasonDto, SourceDto } from '../dtos/anime-editor.dto';

import { GenreMapper } from './genre.mapper';
import { StudioMapper } from './studio.mapper';
import { DateRangeMapper } from './dateRange.mapper';

export const ANIME_STATUS_FROM_DTO_MAP: Readonly<Record<AnimeStatusDto, AnimeStatus>> = {
  [AnimeStatusDto.Airing]: AnimeStatus.Airing,
  [AnimeStatusDto.Finished]: AnimeStatus.Finished,
  [AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
};

export const ANIME_TYPE_FROM_DTO_MAP: Readonly<Record<AnimeTypeDto, AnimeType>> = {
  [AnimeTypeDto.Movie]: AnimeType.Movie,
  [AnimeTypeDto.Music]: AnimeType.Music,
  [AnimeTypeDto.Ona]: AnimeType.Ona,
  [AnimeTypeDto.Ova]: AnimeType.Ova,
  [AnimeTypeDto.Special]: AnimeType.Special,
  [AnimeTypeDto.Tv]: AnimeType.Tv,
};

export const ANIME_STATUS_TO_DTO_MAP: Readonly<Record<AnimeStatus, AnimeStatusDto>> = {
  [AnimeStatus.Airing]: AnimeStatusDto.Airing,
  [AnimeStatus.Finished]: AnimeStatusDto.Finished,
  [AnimeStatus.NotYetAired]: AnimeStatusDto.NotYetAired,
};

export const ANIME_TYPE_TO_DTO_MAP: Readonly<Record<AnimeType, AnimeTypeDto>> = {
  [AnimeType.Movie]: AnimeTypeDto.Movie,
  [AnimeType.Music]: AnimeTypeDto.Music,
  [AnimeType.Ona]: AnimeTypeDto.Ona,
  [AnimeType.Ova]: AnimeTypeDto.Ova,
  [AnimeType.Special]: AnimeTypeDto.Special,
  [AnimeType.Tv]: AnimeTypeDto.Tv,
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

const ANIME_SOURCE_FROM_DTO_MAP: Readonly<Record<SourceDto, Source>> = {
  [SourceDto.Book]: Source.Book,
  [SourceDto.CardGame]: Source.CardGame,
  [SourceDto.FourKomaManga]: Source.FourKomaManga,
  [SourceDto.Game]: Source.Game,
  [SourceDto.LightNovel]: Source.LightNovel,
  [SourceDto.Manga]: Source.Manga,
  [SourceDto.MixedMedia]: Source.MixedMedia,
  [SourceDto.Music]: Source.Music,
  [SourceDto.Novel]: Source.Novel,
  [SourceDto.Original]: Source.Original,
  [SourceDto.Other]: Source.Other,
  [SourceDto.PictureBook]: Source.PictureBook,
  [SourceDto.Radio]: Source.Radio,
  [SourceDto.Unknown]: Source.Unknown,
  [SourceDto.VisualNovel]: Source.VisualNovel,
  [SourceDto.WebManga]: Source.WebManga,
  [SourceDto.WebNovel]: Source.WebNovel,
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

const ANIME_RATING_FROM_DTO_MAP: Readonly<Record<RatingDto, Rating>> = {
  [RatingDto.GeneralAudiences]: Rating.GeneralAudiences,
  [RatingDto.ParentalGuidance]: Rating.ParentalGuidance,
  [RatingDto.ParentsStrongly]: Rating.ParentsStrongly,
  [RatingDto.Restricted]: Rating.Restricted,
  [RatingDto.RestrictedPlus]: Rating.RestrictedPlus,
  [RatingDto.RestrictedX]: Rating.RestrictedX,
  [RatingDto.Unknown]: Rating.Unknown,
};

const ANIME_SEASON_TO_DTO_MAP: Readonly<Record<Season, SeasonDto>> = {
  [Season.Fall]: SeasonDto.Fall,
  [Season.NonSeasonal]: SeasonDto.NonSeasonal,
  [Season.Spring]: SeasonDto.Spring,
  [Season.Summer]: SeasonDto.Summer,
  [Season.Winter]: SeasonDto.Winter,
};

const ANIME_SEASON_FROM_DTO_MAP: Readonly<Record<SeasonDto, Season>> = {
  [SeasonDto.Fall]: Season.Fall,
  [SeasonDto.NonSeasonal]: Season.NonSeasonal,
  [SeasonDto.Spring]: Season.Spring,
  [SeasonDto.Summer]: Season.Summer,
  [SeasonDto.Winter]: Season.Winter,
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
      genres: dto.genres,
      studios: dto.studios,
    });
  }

  /**
   * Maps dto to model.
   * @param dto Anime editor dto.
   */
  export function fromEditorDto(dto: AnimeEditorDto): AnimeEditor {
    if (!isDefined(ANIME_SOURCE_FROM_DTO_MAP[dto.source])) {
      throw new Error(`Unknown value: ${dto.source}`);
    }

    if (!isDefined(ANIME_RATING_FROM_DTO_MAP[dto.rating])) {
      throw new Error(`Unknown value: ${dto.rating}`);
    }

    if (!isDefined(ANIME_SEASON_FROM_DTO_MAP[dto.season])) {
      throw new Error(`Unknown value: ${dto.season}`);
    }

    return new AnimeEditor({
      ...AnimeMapper.fromDetailsDto(dto),
      source: ANIME_SOURCE_FROM_DTO_MAP[dto.source],
      rating: ANIME_RATING_FROM_DTO_MAP[dto.rating],
      season: ANIME_SEASON_FROM_DTO_MAP[dto.season],
      studios: dto.studios,
      genres: dto.genres,
    });
  }

  /**
   * Maps model to dto.
   * @param model PostAnimeEditor.
   */
  export function toPostEditorDto(model: CreateAnime): PostAnimeDto {
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

  /**
   * Maps model to dto.
   * @param model PutAnimeEditor.
   */
  export function toPutEditorDto(model: UpdateAnime): PutAnimeDto {
    return {
      id: model.id,
      ...AnimeMapper.toPostEditorDto(model),
    };
  }
}
