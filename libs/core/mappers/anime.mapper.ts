/* eslint-disable @typescript-eslint/naming-convention */
import { CreateAnimeEditor, Rating, Season, Source } from '../models/anime-editor';
import { AnimeDetails } from '../models/animeDetails';
import { AnimeDetailsDto } from '../dtos/animeDetails';
import { AnimeBase, Status, Type } from '../models/anime';
import { CreateAnimeEditorDto, RatingDto, SeasonDto, SourceDto } from '../dtos/anime-editor.dto';
import { isDefined } from '../utils/guards/general.guard';
import { AnimeBaseDto, StatusDto, TypeDto } from '../dtos/anime.dto';

import { GenreMapper } from './genre.mapper';
import { StudioMapper } from './studio.mapper';
import { DateRangeMapper } from './dateRange.mapper';

const STATUS_FROM_DTO_MAP: Readonly<Record<StatusDto, Status>> = {
  [StatusDto.Airing]: Status.Airing,
  [StatusDto.Finished]: Status.Finished,
  [StatusDto.NotYetAired]: Status.NotYetAired,
};

const STATUS_TO_DTO_MAP: Readonly<Record<Status, StatusDto>> = {
  [Status.Airing]: StatusDto.Airing,
  [Status.Finished]: StatusDto.Finished,
  [Status.NotYetAired]: StatusDto.NotYetAired,
};

const TYPE_TO_DTO_MAP: Readonly<Record<Type, TypeDto>> = {
  [Type.Movie]: TypeDto.Movie,
  [Type.Music]: TypeDto.Music,
  [Type.Ona]: TypeDto.Ona,
  [Type.Ova]: TypeDto.Ova,
  [Type.Special]: TypeDto.Special,
  [Type.Tv]: TypeDto.Tv,
};

const TYPE_FROM_DTO_MAP: Readonly<Record<TypeDto, Type>> = {
  [TypeDto.Movie]: Type.Movie,
  [TypeDto.Music]: Type.Music,
  [TypeDto.Ona]: Type.Ona,
  [TypeDto.Ova]: Type.Ova,
  [TypeDto.Special]: Type.Special,
  [TypeDto.Tv]: Type.Tv,
};

const SOURCE_TO_DTO_MAP: Readonly<Record<Source, SourceDto>> = {
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

const RATING_TO_DTO_MAP: Readonly<Record<Rating, RatingDto>> = {
  [Rating.GeneralAudiences]: RatingDto.GeneralAudiences,
  [Rating.ParentalGuidance]: RatingDto.ParentalGuidance,
  [Rating.ParentsStrongly]: RatingDto.ParentsStrongly,
  [Rating.Restricted]: RatingDto.Restricted,
  [Rating.RestrictedPlus]: RatingDto.RestrictedPlus,
  [Rating.RestrictedX]: RatingDto.RestrictedX,
  [Rating.Unknown]: RatingDto.Unknown,
};

const SEASON_TO_DTO_MAP: Readonly<Record<Season, SeasonDto>> = {
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
    if (!isDefined(STATUS_FROM_DTO_MAP[dto.status])) {
      throw new Error(`Unknown value: ${dto.status}`);
    }

    if (!isDefined(TYPE_FROM_DTO_MAP[dto.type])) {
      throw new Error(`Unknown value: ${dto.type}`);
    }

    return new AnimeBase({
      id: dto.id,
      image: dto.image,
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      imageTitle: dto.title_eng ?? dto.title_jpn ?? 'no title',
      aired: DateRangeMapper.fromDto(dto.aired),
      status: STATUS_FROM_DTO_MAP[dto.status],
      type: TYPE_FROM_DTO_MAP[dto.type],
    });
  }

  /**
   * Maps dto to model.
   * @param dto Anime details dto.
   */
  export function fromDetailsDto(dto: AnimeDetailsDto): AnimeDetails {
    if (!isDefined(STATUS_FROM_DTO_MAP[dto.status])) {
      throw new Error(`Unknown value: ${dto.status}`);
    }

    if (!isDefined(TYPE_FROM_DTO_MAP[dto.type])) {
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
  export function toEditorDto(model: CreateAnimeEditor): CreateAnimeEditorDto {
    if (!isDefined(STATUS_TO_DTO_MAP[model.status])) {
      throw new Error(`Unknown value: ${model.status}`);
    }

    if (!isDefined(TYPE_TO_DTO_MAP[model.type])) {
      throw new Error(`Unknown value: ${model.type}`);
    }

    if (!isDefined(SOURCE_TO_DTO_MAP[model.source])) {
      throw new Error(`Unknown value: ${model.source}`);
    }

    if (!isDefined(RATING_TO_DTO_MAP[model.rating])) {
      throw new Error(`Unknown value: ${model.rating}`);
    }

    if (!isDefined(SEASON_TO_DTO_MAP[model.season])) {
      throw new Error(`Unknown value: ${model.season}`);
    }

    return {
      image: model.image,
      trailer_youtube_id: model.trailerYoutubeId,
      title_eng: model.titleEnglish,
      title_jpn: model.titleJapanese,
      type: TYPE_TO_DTO_MAP[model.type],
      status: STATUS_TO_DTO_MAP[model.status],
      source: SOURCE_TO_DTO_MAP[model.source],
      airing: model.isAiring,
      aired: DateRangeMapper.toDto(model.aired),
      rating: RATING_TO_DTO_MAP[model.rating],
      season: SEASON_TO_DTO_MAP[model.season],
      synopsis: model.synopsis,
      studios: model.studios,
      genres: model.genres,
    };
  }
}
