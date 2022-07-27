import { catchError, map, Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { isSortField, isSortOrdering, isType } from '@js-camp/core/utils/guards/sort.guard';
import { Sort, SortField, SortOrdering as SortDirection } from '@js-camp/core/utils/types/sort';

import { AnimeListParams } from '@js-camp/core/utils/interfaces/anime.interface';

/** Params for request anime list. */
interface AnimeListQueryParams {

  /** Sort settings. */
  readonly sort: Sort<SortDirection, SortField>;

  /** Filter settings. */
  readonly filter: {

    /** Filter by type. */
    byType: readonly string[];
  };

  /** Maximum number of entries per page. */
  readonly limit: number;

  /** Offset in records. */
  readonly offset: number;

  /** Search query. */
  readonly search: string;
}

/** Standard form query params. */
interface QueryParams {
  [key: string]: string;
}

/** All possible query parameters. */
enum Param {
  Offset = 'offset',
  Limit = 'limit',
  Ordering = 'ordering',
  TypeIn = 'type__in',
  Search = 'search',
}

/** Anime limit when requesting a new page. */
const DEFAULT_LIMIT = 5;

/** Anime offset when requesting a new page. */
const DEFAULT_OFFSET = 0;

/** Default sort settings. */
const DEFAULT_ANIME_LIST_QUERY_PARAMS: AnimeListQueryParams = {
  sort: {
    field: SortField.TitleEnglish,
    direction: SortDirection.Ascending,
  },
  filter: {
    byType: [],
  },
  limit: DEFAULT_LIMIT,
  offset: DEFAULT_OFFSET,
  search: '',
};

const ERROR_NOT_PARAMS = ' Parameters not found';

/** */
@Injectable({
  providedIn: 'root',
})
export class QueryParamsService {
  public constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { }

  /**
   * Gets anime list http params for specific query.
   * @param newParams New query parameters that should be in the request.
   */
  public getAnimeListHttpParams({ pageNumber, sort, filter, search }: AnimeListParams): Observable<HttpParams> {
    return this.route.queryParams.pipe(
      map(params => {
        const animeListQueryParams = this.getAnimeListQueryParams(params);
        const newAnimeListQueryParams: AnimeListQueryParams = {
          ...animeListQueryParams,
          offset: pageNumber * animeListQueryParams.limit,
          sort: {
            field: isSortField(sort.field) ? sort.field : SortField.TitleEnglish,
            direction: sort.direction === 'asc' ? SortDirection.Ascending : SortDirection.Descending,
          },
          filter: {
            byType: filter.byType.every(type => isType(type)) ? filter.byType : [''],
          },
          search,
        };

        this.setUrl(this.animeListParamsToQueryParams(newAnimeListQueryParams));

        return this.animeListParamsToHttpParams(newAnimeListQueryParams);
      }),
      catchError(() => {
        this.setUrl(this.animeListParamsToQueryParams(DEFAULT_ANIME_LIST_QUERY_PARAMS));

        return of(this.animeListParamsToHttpParams(DEFAULT_ANIME_LIST_QUERY_PARAMS));
      }),
    );
  }

  /**
   * Gets anime list params from URL query params.
   * @param params URL query params.
   */
  private getAnimeListQueryParams(params: QueryParams): AnimeListQueryParams {
    const limit = params[Param.Limit];
    const offset = params[Param.Offset];
    const ordering = params[Param.Ordering];
    const type = params[Param.TypeIn];
    const search = params[Param.Search];

    if (limit === undefined || offset === undefined || ordering === undefined || type === undefined || search === undefined) {
      throw new Error(ERROR_NOT_PARAMS);
    }

    const field = ordering.replace('-', '');
    const direction = ordering.includes('-') ? SortDirection.Descending : SortDirection.Ascending;
    if (isSortField(field) && isSortOrdering(direction)) {
      return {
        limit: Number(limit),
        offset: Number(offset),
        sort: {
          field,
          direction,
        },
        filter: {
          byType: type.split(','),
        },
        search,
      };
    }
    return DEFAULT_ANIME_LIST_QUERY_PARAMS;
  }

  /**
   * Converts anime list params to query params.
   * @param params Anime list params.
   */
  private animeListParamsToQueryParams(params: AnimeListQueryParams): QueryParams {
    return {
      [Param.Limit]: String(params.limit),
      [Param.Offset]: String(params.offset),
      [Param.Ordering]: `${params.sort.direction}${params.sort.field}`,
      [Param.TypeIn]: `${params.filter.byType.toString()}`,
      [Param.Search]: params.search,
    };
  }

  /**
   * Converts anime list params to http params.
   * @param params Anime list params.
   */
  private animeListParamsToHttpParams(params: AnimeListQueryParams): HttpParams {
    const queryParams = new HttpParams()
      .set(Param.Limit, params.limit)
      .set(Param.Offset, params.offset)
      .set(Param.Ordering, `${params.sort.direction}${params.sort.field}`)
      .set(Param.TypeIn, `${params.filter.byType.toString()}`)
      .set(Param.Search, params.search);
    return queryParams;
  }

  /**
   * Sets new query params in url.
   * @param params Query params.
   */
  private setUrl(params: QueryParams): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
}
