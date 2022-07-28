import { map, Observable, switchMap, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AnimeBaseDto } from '@js-camp/core/dtos/anime.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeBase, Type } from '@js-camp/core/models/anime';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { SortDirection, SortField } from '@js-camp/core/utils/types/sort';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeListQueryMapper } from '@js-camp/core/mappers/anime-list-query.mapper';
import { AnimeListQueryParams, FilterSetting, SortSetting } from '@js-camp/core/utils/interfaces/anime.interface';

import { AppConfigService } from './app-config.service';

/** Params for for anime list request. */
export interface AnimeListParams {

  /** The page number to be returned. */
  readonly pageNumber: number;

  /** Sort setting. */
  readonly sort: SortSetting;

  /** Filter setting. */
  readonly filter: FilterSetting;

  /** Search query. */
  readonly search: string;
}

/** All possible query parameters. */
enum ParamName {
  Offset = 'offset',
  Limit = 'limit',
  Ordering = 'ordering',
  TypeIn = 'type__in',
  Search = 'search',
}

namespace DefaultParamValue {
  export const LIMIT = 5;
  export const OFFSET = 0;
  export const SEARCH = '';
  export const ORDERING = `${SortDirection.Ascending}${SortField.TitleEnglish}`;
  export const TYPE = '';
}

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {

  private readonly animeListUrl: URL;

  public constructor(
    config: AppConfigService,
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly route: ActivatedRoute,
  ) {
    this.animeListUrl = new URL(`anime/anime/`, config.apiUrl);
  }

  /**
   * Requests to the server to get anime.
   * @param animeListParams Parameters for generating a request.
   */
  public fetchAnimeList(animeListParams: AnimeListParams): Observable<Pagination<AnimeBase>> {
    const animeListHttpParams$ = this.route.queryParams.pipe(
      map(params => {
        const currentAnimeListQueryParams = this.getAnimeListQueryParams(params);

        const newAnimeListQueryParams = AnimeListQueryMapper.toDto({
          ...currentAnimeListQueryParams,
          ...animeListParams,
          limit: DefaultParamValue.LIMIT,
        });

        return this.animeListParamsToHttpParams(newAnimeListQueryParams);
      }),
    );

    return animeListHttpParams$
      .pipe(
        tap(params => this.setUrl(this.getAnimeListQueryParams(params))),
        switchMap(params => this.http.get<PaginationDto<AnimeBaseDto>>(
          this.animeListUrl.toString(), {
            params,
          },
        )),
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

  /**
   * Sets new query params in url.
   * @param params Query params.
   */
  private setUrl(params: AnimeListQueryParams): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  /**
   * Gets anime list params from URL query params.
   * @param params URL query params.
   */
  private getAnimeListQueryParams(params: Params): AnimeListQueryParams {
    const limit = params[ParamName.Limit] !== undefined ? Number(params[ParamName.Limit]) : DefaultParamValue.LIMIT;
    const offset = params[ParamName.Offset] !== undefined ? Number(params[ParamName.Offset]) : DefaultParamValue.OFFSET;
    const ordering = params[ParamName.Ordering] !== undefined ? params[ParamName.Ordering] : DefaultParamValue.ORDERING;
    const type = params[ParamName.TypeIn] !== undefined ? params[ParamName.TypeIn] : DefaultParamValue.TYPE;
    const search = params[ParamName.Search] !== undefined ? params[ParamName.Search] : DefaultParamValue.SEARCH;
    return { limit, offset, ordering, type, search };
  }

  /**
   * Converts anime list params to http params.
   * @param params Anime list params.
   */
  private animeListParamsToHttpParams(params: AnimeListQueryParams): HttpParams {
    return new HttpParams()
      .set(ParamName.Limit, params.limit)
      .set(ParamName.Offset, params.offset)
      .set(ParamName.Ordering, `${params.ordering}`)
      .set(ParamName.TypeIn, `${params.type}`)
      .set(ParamName.Search, params.search);
  }
}
