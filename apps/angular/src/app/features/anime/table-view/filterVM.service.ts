import { BehaviorSubject, combineLatest, debounceTime, defer, map, Observable, startWith } from 'rxjs';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SortDirection } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeSortDirection, AnimeSortField, AnimeType } from '@js-camp/core/models/anime';
import { AnimeListQueryParams } from '@js-camp/core/models/anime-list-query-params';

import { AnimeService } from '../../../../core/services/anime.service';

/** Filter item. */
export interface FilterItem {

  /** Key of filter. */
  readonly field: string;

  /** Name of filter. */
  readonly title: string;

  /** Is a filter selected. */
  readonly isSelect: boolean;
}

interface QueryFormControls {

  /** Filter by type. */
  readonly typeFilter: FormControl<AnimeType[]>;

  /** Value of search input. */
  readonly search: FormControl<string>;

}

interface TableSort {

  /** The field by which to sort. */
  readonly field: AnimeSortField;

  /** The sort order. */
  readonly direction: SortDirection;
}

const INPUT_DEBOUNCE_TIME = 500;
const DEFAULT_PARAMS: AnimeListQueryParams = {
  page: 0,
  pageSize: 25,
  search: '',
  types: [AnimeType.Tv],
  sort: {
    field: AnimeSortField.TitleJapanese,
    direction: AnimeSortDirection.Ascending,
  },
};

/** Table view service. */
@Injectable({
  providedIn: 'platform',
})
export class FilterVMService {

  /** All possible type filters. */
  public readonly types$: Observable<FilterItem[]>;

  /** Number of records per page. */
  public readonly pageSize: number;

  /** Query group. */
  public readonly queryForm: FormGroup<QueryFormControls>;

  /** Current sort settings. */
  protected readonly _sort$: BehaviorSubject<TableSort>;

  /** Gets current sort settings. */
  public get sort$(): Observable<TableSort> {
    return this._sort$.asObservable();
  }

  /** Current page number. */
  protected readonly _currentPageNumber$: BehaviorSubject<number>;

  /** Gets current page number. */
  public get currentPageNumber$(): Observable<number> {
    return this._currentPageNumber$.asObservable();
  }

  /** @inheritdoc */
  public constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly animeService: AnimeService,
    private readonly formBuilder: FormBuilder,
  ) {
    const animeListOptions = this.getAnimeListOptions();

    this.pageSize = animeListOptions.pageSize ?? DEFAULT_PARAMS.pageSize;

    this.queryForm = this.formBuilder.nonNullable.group({
      search: new FormControl(animeListOptions.search, {
        nonNullable: true,
      }),
      typeFilter: new FormControl([...animeListOptions.types], {
        nonNullable: true,
      }),
    });

    this._sort$ = new BehaviorSubject<TableSort>({
      field: animeListOptions.sort.field,
      direction: animeListOptions.sort.direction === 'asc' ? 'asc' : 'desc',
    });

    this._currentPageNumber$ = new BehaviorSubject<number>(animeListOptions.page);

    this.types$ = this.getTypes();
  }

  /**
   * Sets current page number.
   * @param pageNumber Page number.
   */
  public setCurrentPageNumber(pageNumber: number): void {
    this._currentPageNumber$.next(pageNumber);
  }

  /**
   * Sets sort.
   * @param sort Table sort.
   */
  public setSort(sort: TableSort): void {
    this._sort$.next(sort);
  }

  /** Gets filter changes. */
  public getFilterChanges(): Observable<[[string, AnimeType[], TableSort], number]> {
    const animeListOptions = this.getAnimeListOptions();

    const searchChanges$ = this.queryForm.controls.search.valueChanges.pipe(
      startWith(animeListOptions.search),
    );

    const typesChanges$ = this.queryForm.controls.typeFilter.valueChanges.pipe(
      startWith(animeListOptions.types),
      map((types): AnimeType[] => [...types]),
    );

    const filterParamsChange$ = combineLatest([
      searchChanges$,
      typesChanges$,
      this._sort$,
    ]).pipe(
      debounceTime(INPUT_DEBOUNCE_TIME),
    );

    return combineLatest([
      filterParamsChange$,
      this._currentPageNumber$,
    ]);
  }

  /**
   * Sets query params to URL.
   * @param AnimeListQueryParams Anime list query params.
   */
  public setQueryParamsToUrl({ page, pageSize, search, sort, types }: AnimeListQueryParams): void {
    const queryParamsForUrl = { page, pageSize, search, types: types.toString(), field: sort.field, direction: sort.direction };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParamsForUrl,
      queryParamsHandling: 'merge',
    });
  }

  /** Gets filter by type. */
  protected getTypes(): Observable<FilterItem[]> {
    return defer(() => this.animeService.getAnimeTypes()).pipe(
      map(types => types.map(
        type => ({
          field: type,
          title: type,
          isSelect: false,
        }),
      )),
    );
  }

  /** Gets anime list options. */
  protected getAnimeListOptions(): AnimeListQueryParams {
    const params = this.route.snapshot.queryParams;

    return {
      page: params['page'] ?? DEFAULT_PARAMS.page,
      pageSize: params['pageSize'] ?? DEFAULT_PARAMS.pageSize,
      search: params['search'] ?? DEFAULT_PARAMS.search,
      types: params['types'] !== undefined ? params['types'].split(',') : DEFAULT_PARAMS.types,
      sort: {
        field: params['field'] ?? DEFAULT_PARAMS.sort.field,
        direction: params['direction'] ?? DEFAULT_PARAMS.sort.direction,
      },
    };
  }
}
