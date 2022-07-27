import { map, Observable, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AnimeBase, Type } from '@js-camp/core/models/anime';
import { AnimeBaseDto } from '@js-camp/core/dtos/anime.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeListParams } from '@js-camp/core/utils/interfaces/anime.interface';

import { AppConfigService } from './app-config.service';
import { QueryParamsService } from './query-params.service';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {

  private readonly animeListUrl: URL;

  public constructor(
    config: AppConfigService,
    private readonly http: HttpClient,
    private readonly queryParamsService: QueryParamsService,
  ) {
    this.animeListUrl = new URL(`anime/anime/`, config.apiUrl);
  }

  /**
   * Requests to the server to get anime.
   * @param animeListParams Parameters for generating a request.
   */
  public fetchAnimeList(animeListParams: AnimeListParams): Observable<Pagination<AnimeBase>> {
    return this.queryParamsService.getAnimeListHttpParams(animeListParams)
      .pipe(
        switchMap(params => this.http.get<PaginationDto<AnimeBaseDto>>(this.animeListUrl.toString(), {
          params,
        })),
        map(
          pagination => PaginationMapper.fromDto<AnimeBaseDto, AnimeBase>(
            pagination,
            animeDto => AnimeMapper.fromDto(animeDto),
          ),
        ),
      );
  }

  /** Gets all anime types. */
  public getAnimeTypes(): string[] {
    return Object.values(Type);
  }
}
