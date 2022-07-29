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
import { isSortField, isType } from '@js-camp/core/utils/guards/sort.guard';
import { AnimeListOptions } from '@js-camp/core/utils/interfaces/anime.interface';

import { AppConfigService } from './app-config.service';

/** All possible query parameters. */
enum ParamName {
  Offset = 'offset',
  Limit = 'limit',
  Ordering = 'ordering',
  TypeIn = 'type__in',
  Search = 'search',
}

namespace DefaultParamValue {
  export const LIMIT = 25;
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
   * @param animeListOptions Parameters for generating a request.
   */
  public fetchAnimeList(animeListOptions: AnimeListOptions): Observable<Pagination<AnimeBase>> {
    const animeListHttpParams$ = this.route.queryParams.pipe(
      map(params => {
        const currentAnimeListOptions = this.getAnimeListOptions(params);

        return this.animeListOptionsToHttpParams({
          ...currentAnimeListOptions,
          ...animeListOptions,
        });
      }),
    );

    return animeListHttpParams$
      .pipe(
        switchMap(params => this.http.get<PaginationDto<AnimeBaseDto>>(
          this.animeListUrl.toString(), { params },
        )),
        tap(params => this.setUrl(params.toString())),
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

  /** Gets page limit. */
  public getLimit(): number {
    return DefaultParamValue.LIMIT;
  }

  /**
   * Sets new query params in url.
   * @param query Query string.
   */
  private setUrl(query: string): void {
    const queryParams: Params = {};

    query.split('&').forEach(param => {
      const [key, value] = param.split('=');
      queryParams[key] = value;
    });

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  /**
   * Gets anime list params from URL query params.
   * @param params URL query params.
   */
  private getAnimeListOptions(params: Params): AnimeListOptions {
    const limit = params[ParamName.Limit] !== undefined ? Number(params[ParamName.Limit]) : DefaultParamValue.LIMIT;
    const offset = params[ParamName.Offset] !== undefined ? Number(params[ParamName.Offset]) : DefaultParamValue.OFFSET;
    const ordering = params[ParamName.Ordering] !== undefined ? String(params[ParamName.Ordering]) : DefaultParamValue.ORDERING;

    const field = ordering.replace('-', '');
    const direction = ordering.includes('-') ? 'desc' : 'asc';

    const type = params[ParamName.TypeIn] !== undefined ? String(params[ParamName.TypeIn]) : DefaultParamValue.TYPE;
    const search = params[ParamName.Search] !== undefined ? String(params[ParamName.Search]) : DefaultParamValue.SEARCH;

    return {
      pageNumber: offset / limit,
      sort: {
        direction,
        field,
      },
      filter: {
        byType: type.split(','),
      },
      limit,
      search,
    };
  }

  /**
   * Converts anime list params to http params.
   * @param params Anime list params.
   */
  private animeListOptionsToHttpParams({
    pageNumber,
    sort,
    filter,
    search,
    limit = DefaultParamValue.LIMIT,
  }: AnimeListOptions): HttpParams {
    const direction = sort.direction === 'asc' ? SortDirection.Ascending : SortDirection.Descending;
    const sortField = isSortField(sort.field) ? sort.field : SortField.TitleEnglish;
    const ordering = `${direction}${sortField}`;

    const filterType = filter.byType.every(type => isType(type)) ? filter.byType.toString() : '';

    return new HttpParams()
      .set(ParamName.Limit, limit)
      .set(ParamName.Offset, pageNumber * limit)
      .set(ParamName.Ordering, ordering)
      .set(ParamName.TypeIn, filterType)
      .set(ParamName.Search, search);
  }
}
