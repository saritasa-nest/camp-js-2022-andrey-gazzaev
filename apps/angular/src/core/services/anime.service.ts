import { map, Observable, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AnimeBase } from '@js-camp/core/models/anime';
import { AnimeBaseDto } from '@js-camp/core/dtos/anime.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { AppConfigService } from './app-config.service';
import { QueryParamsService } from './query-params.service';

interface SortSetting {

  /** The field by which to sort. */
  field: string;

  /** The sort direction. */
  direction: string;
}

interface AnimeListParams {

  /** The page number to be returned. */
  pageNumber: number;

  /** Sort setting. */
  sort: SortSetting;
}

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
   * @param params Parameters for generating a request.
   */
  public fetchAnimeList({ pageNumber, sort }: AnimeListParams): Observable<Pagination<AnimeBase>> {
    return this.queryParamsService.getAnimeListHttpParams({ pageNumber, sort })
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
}
