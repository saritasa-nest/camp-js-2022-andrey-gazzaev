import { catchError, Observable, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

/** URL search query params. */
export interface SearchQueryParams {

  // /** Sort settings. */
  // readonly sort: Sort<SortOrdering, SortField>;

  // /** Filter settings. */
  // readonly filter: Filter;

  /** Maximum number of entries per page. */
  readonly limit: number;

  /** Offset in records. */
  readonly offset: number;
}

/** All possible query parameters. */
enum Param {
  Offset = 'offset',
  Limit = 'limit',
  Ordering = 'ordering',
  Status = 'status',
  Type = 'type',
  Id = 'id',
}

/** Anime limit when requesting a new page. */
const DEFAULT_LIMIT = 5;

/** Anime offset when requesting a new page. */
export const DEFAULT_OFFSET = 0;

/** Default sort settings. */
export const DEFAULT_PAGINATION_SETTINGS: SearchQueryParams = {
  // sort: {
  //   field: SortField.Aired,
  //   ordering: SortOrdering.Ascending,
  // },
  // filter: {
  //   byTypeField: Type.Tv,
  //   byStatusField: Status.Airing,
  // },
  limit: DEFAULT_LIMIT,
  offset: DEFAULT_OFFSET,
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

  private getQueryParamsAnimeList(params: Params): SearchQueryParams {
    const limit = params[Param.Limit];
    const offset = params[Param.Offset];
    if (limit === undefined || offset === undefined) {
      throw new Error(ERROR_NOT_PARAMS);

    }
    return { limit: Number(limit), offset: Number(offset) };
  }

  private searchQueryParamsToHttpParams(params: SearchQueryParams): HttpParams {
    const queryParams = new HttpParams()
      .set(Param.Limit, params.limit)
      .set(Param.Offset, params.offset);
    return queryParams;
  }

  private updateUrl(params: Params): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  /**
   * Gets anime list for specific page.
   * @param pageNumber The page number to get anime.
   */
  public getAnimeListHttpParams(pageNumber: number): Observable<HttpParams> {
    return this.route.queryParams.pipe(
      switchMap(params => {
        const searchQueryParams = this.getQueryParamsAnimeList(params);
        const newParams = { ...searchQueryParams, offset: pageNumber * searchQueryParams.limit };
        const httpParams = this.searchQueryParamsToHttpParams(newParams);
        this.updateUrl(newParams);
        return of(httpParams);
      }),
      catchError(() => {
        this.updateUrl(DEFAULT_PAGINATION_SETTINGS);
        return of(
          this.searchQueryParamsToHttpParams(DEFAULT_PAGINATION_SETTINGS),
        );
      }),
    );
  }
}
