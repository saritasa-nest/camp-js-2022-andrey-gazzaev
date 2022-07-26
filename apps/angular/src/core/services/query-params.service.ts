import { catchError, map, Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Sort, SortField, SortOrdering } from '@js-camp/core/utils/types/sort';
import { isSortField, isSortOrdering } from '@js-camp/core/utils/guards/sort.guard';

/** URL search query params. */
export interface AnimeListParams {

  /** Sort settings. */
  readonly sort: Sort<SortOrdering, SortField>;

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
export const DEFAULT_PAGINATION_SETTINGS: AnimeListParams = {
  sort: {
    field: SortField.TitleEnglish,
    ordering: SortOrdering.Ascending,
  },
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

  private getQueryParamsAnimeList(params: Params): AnimeListParams {
    const limit = params[Param.Limit];
    const offset = params[Param.Offset];
    const ordering = params[Param.Ordering];

    if (limit === undefined || offset === undefined || ordering === undefined) {
      throw new Error(ERROR_NOT_PARAMS);

    }

    const field = ordering.replace('-', '');
    const direction = ordering.includes('-') ? SortOrdering.Descending : SortOrdering.Ascending;
    if (isSortField(field) && isSortOrdering(direction)) {

      return { limit: Number(limit), offset: Number(offset), sort: { field, ordering: direction } };
    }
    return DEFAULT_PAGINATION_SETTINGS;
  }

  private searchQueryParamsToParams(params: AnimeListParams): Params {

    return { limit: Number(params.limit), offset: Number(params.offset), ordering: `${params.sort.ordering}${params.sort.field}` };
  }

  private searchQueryParamsToHttpParams(params: AnimeListParams): HttpParams {
    const queryParams = new HttpParams()
      .set(Param.Limit, params.limit)
      .set(Param.Offset, params.offset)
      .set(Param.Ordering, `${params.sort.ordering}${params.sort.field}`);
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
   * @param sort Sort options.
   */
  public getAnimeListHttpParams(pageNumber: number, sort: { field: string; ordering: string; }): Observable<HttpParams> {
    return this.route.queryParams.pipe(
      map(params => {
        const searchQueryParams = this.getQueryParamsAnimeList(params);
        const newParams: AnimeListParams = {
          ...searchQueryParams,
          offset: pageNumber * searchQueryParams.limit,
          sort: {
            field: isSortField(sort.field) ? sort.field : SortField.TitleEnglish,
            ordering: sort.ordering === 'asc' ? SortOrdering.Ascending : SortOrdering.Descending,
          },
        };
        const httpParams = this.searchQueryParamsToHttpParams(newParams);
        this.updateUrl(this.searchQueryParamsToParams(newParams));
        return httpParams;
      }),
      catchError(() => {
        const httpParams = this.searchQueryParamsToHttpParams(DEFAULT_PAGINATION_SETTINGS);
        this.updateUrl(this.searchQueryParamsToParams(DEFAULT_PAGINATION_SETTINGS));
        return of(httpParams);
      }),
    );
  }
}
