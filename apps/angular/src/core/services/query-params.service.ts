import { catchError, map, Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Sort, SortField, SortOrdering as SortDirection } from '@js-camp/core/utils/types/sort';
import { isSortField, isSortOrdering, isType } from '@js-camp/core/utils/guards/sort.guard';

/** Params for request anime list. */
interface AnimeListParams {

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
}

/** Standard form query params. */
interface QueryParams {
  [key: string]: string;
}

interface NewSortSetting {

  /** The field by which to sort. */
  field: string;

  /** The sort direction. */
  direction: string;
}

interface NewFilterSetting {

  byType: string[];
}

interface NewAnimeListParams {

  /** The page number to be returned. */
  pageNumber: number;

  /** Sort setting. */
  sort: NewSortSetting;

  filter: NewFilterSetting;
}

/** All possible query parameters. */
enum Param {
  Offset = 'offset',
  Limit = 'limit',
  Ordering = 'ordering',
  Status = 'status',
  TypeIn = 'type__in',
  Id = 'id',
}

/** Anime limit when requesting a new page. */
const DEFAULT_LIMIT = 5;

/** Anime offset when requesting a new page. */
const DEFAULT_OFFSET = 0;

/** Default sort settings. */
const DEFAULT_PAGINATION_SETTINGS: AnimeListParams = {
  sort: {
    field: SortField.TitleEnglish,
    direction: SortDirection.Ascending,
  },
  filter: {
    byType: [],
  },
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

  /**
   * Gets anime list http params for specific query.
   * @param newParams New query parameters that should be in the request.
   */
  public getAnimeListHttpParams({ pageNumber, sort, filter }: NewAnimeListParams): Observable<HttpParams> {
    return this.route.queryParams.pipe(
      map(params => {
        const animeListParams = this.getAnimeListParams(params);
        const newAnimeListParams: AnimeListParams = {
          ...animeListParams,
          offset: pageNumber * animeListParams.limit,
          sort: {
            field: isSortField(sort.field) ? sort.field : SortField.TitleEnglish,
            direction: sort.direction === 'asc' ? SortDirection.Ascending : SortDirection.Descending,
          },
          filter: {
            byType: filter.byType.every(type => isType(type)) ? filter.byType : [''],
          },
        };

        this.setUrl(this.animeListParamsToQueryParams(newAnimeListParams));

        return this.animeListParamsToHttpParams(newAnimeListParams);
      }),
      catchError(() => {
        this.setUrl(this.animeListParamsToQueryParams(DEFAULT_PAGINATION_SETTINGS));

        return of(this.animeListParamsToHttpParams(DEFAULT_PAGINATION_SETTINGS));
      }),
    );
  }

  /**
   * Gets anime list params from URL query params.
   * @param params URL query params.
   */
  private getAnimeListParams(params: QueryParams): AnimeListParams {
    const limit = params[Param.Limit];
    const offset = params[Param.Offset];
    const ordering = params[Param.Ordering];
    const type = params[Param.TypeIn];

    if (limit === undefined || offset === undefined || ordering === undefined || type === undefined) {
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
      };
    }
    return DEFAULT_PAGINATION_SETTINGS;
  }

  /**
   * Converts anime list params to query params.
   * @param params Anime list params.
   */
  private animeListParamsToQueryParams(params: AnimeListParams): QueryParams {
    return {
      [Param.Limit]: String(params.limit),
      [Param.Offset]: String(params.offset),
      [Param.Ordering]: `${params.sort.direction}${params.sort.field}`,
      [Param.TypeIn]: `${params.filter.byType.toString()}`,
    };
  }

  /**
   * Converts anime list params to http params.
   * @param params Anime list params.
   */
  private animeListParamsToHttpParams(params: AnimeListParams): HttpParams {
    const queryParams = new HttpParams()
      .set(Param.Limit, params.limit)
      .set(Param.Offset, params.offset)
      .set(Param.Ordering, `${params.sort.direction}${params.sort.field}`)
      .set(Param.TypeIn, `${params.filter.byType.toString()}`);
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
