import { map, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { isSortField, isSortOrdering, isType } from '@js-camp/core/utils/guards/sort.guard';
import { SortField, SortOrdering as SortDirection } from '@js-camp/core/utils/types/sort';

import { AnimeListParams } from '@js-camp/core/utils/interfaces/anime.interface';

/** Params for request anime list. */
interface AnimeListQueryParams {
  [index: string]: string;

  /** Sort settings. */
  readonly ordering: string;

  /** Filter by type. */
  readonly type: string;

  /** Maximum number of entries per page. */
  readonly limit: string;

  /** Offset in records. */
  readonly offset: string;

  /** Search query. */
  readonly search: string;

}

/** Standard formate query params. */
interface QueryParams {
  [key: string]: string | undefined;
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
  export const LIMIT = '5';
  export const OFFSET = '0';
  export const SEARCH = '';
  export const ORDERING = `${SortDirection.Ascending}${SortField.TitleEnglish}`;
  export const TYPE = '';
}

/** Default settings. */
const DEFAULT_ANIME_LIST_QUERY_PARAMS: AnimeListQueryParams = {
  type: DefaultParamValue.TYPE,
  limit: DefaultParamValue.LIMIT,
  offset: DefaultParamValue.OFFSET,
  search: DefaultParamValue.SEARCH,
  ordering: DefaultParamValue.ORDERING,
};

/** Anime list query params service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeListQueryParamsService {
  public constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { }

  /**
   * Gets anime list http params for specific query.
   * @param newParams New query parameters that should be in the request.
   */
  public getAnimeListHttpParams(newParams: AnimeListParams): Observable<HttpParams> {
    return this.route.queryParams.pipe(
      map(params => {
        const newAnimeListQueryParams = this.createNewAnimeListQueryParams(params, newParams);

        this.setUrl(newAnimeListQueryParams);

        return this.animeListParamsToHttpParams(newAnimeListQueryParams);
      }),
    );
  }

  /**
   * Creates new params based on current params.
   * @param currentParams Current URL params.
   * @param newParam New params for URL.
   */
  private createNewAnimeListQueryParams(
    currentParams: Params,
    { pageNumber, sort, filter, search }: AnimeListParams,
  ): AnimeListQueryParams {
    const animeListQueryParams = this.getAnimeListQueryParams(currentParams);

    const direction = sort.direction === 'asc' ? SortDirection.Ascending : SortDirection.Descending;
    const sortField = isSortField(sort.field) ? sort.field : SortField.TitleEnglish;
    const ordering = `${direction}${sortField}`;

    const filterType = filter.byType.every(type => isType(type)) ? filter.byType.toString() : '';

    const newAnimeListQueryParams: AnimeListQueryParams = {
      ...animeListQueryParams,
      offset: String(pageNumber * Number(animeListQueryParams.limit)),
      ordering,
      type: filterType,
      search,
    };

    return newAnimeListQueryParams;
  }

  /**
   * Checks if a params is AnimeListQueryParams.
   * @param params Some params.
   */
  private isAnimeListQueryParams(params: QueryParams): params is AnimeListQueryParams {
    const animeListQueryParams = {
      limit: params[ParamName.Limit],
      offset: params[ParamName.Offset],
      ordering: params[ParamName.Ordering],
      type: params[ParamName.TypeIn],
      search: params[ParamName.Search],
    };

    const values = Object.values(animeListQueryParams);

    for (const value of values) {
      if (value === undefined) {
        return false;
      }
    }
    return true;
  }

  /**
   * Gets anime list params from URL query params.
   * @param params URL query params.
   */
  private getAnimeListQueryParams(params: QueryParams): AnimeListQueryParams {
    if (!this.isAnimeListQueryParams(params)) {
      return DEFAULT_ANIME_LIST_QUERY_PARAMS;
    }

    const limit = params[ParamName.Limit];
    const offset = params[ParamName.Offset];
    const ordering = params[ParamName.Ordering];
    const type = params[ParamName.TypeIn];
    const search = params[ParamName.Search];

    const field = ordering.replace('-', '');
    const direction = ordering.includes('-') ? SortDirection.Descending : SortDirection.Ascending;

    if (isSortField(field) && isSortOrdering(direction)) {
      return {
        limit,
        offset,
        ordering,
        type,
        search,
      };
    }
    return DEFAULT_ANIME_LIST_QUERY_PARAMS;
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
}
