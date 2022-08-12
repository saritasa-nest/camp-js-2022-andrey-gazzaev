import { BehaviorSubject, combineLatest, debounceTime, defer, map, mergeWith, Observable, skip, startWith, switchMap, tap } from 'rxjs';

import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChangeDetectionStrategy, Component, OnInit, TrackByFunction } from '@angular/core';

import { AnimeBase, AnimeType } from '@js-camp/core/models/anime';

import { AnimeService } from '../../../../core/services/anime.service';
import { AnimeListQueryParams } from '../../../../core/models/anime-list-query-params';

const defaultParams: AnimeListQueryParams = {
  page: 0,
  pageSize: 25,
  search: '',
  ordering: '',
  direction: 'asc',
  types: [AnimeType.Tv],
};

interface QueryFormControls {

  /** Filter by type. */
  readonly typeFilter: FormControl<AnimeType[] | null>;

  /** Value of search input. */
  readonly search: FormControl<string | null>;

}

interface TableSort {

  /** The field by which to sort. */
  readonly field: string;

  /** The sort order. */
  readonly direction: SortDirection;
}

interface FilterItem {

  /** Key of filter. */
  readonly field: string;

  /** Name of filter. */
  readonly title: string;

  /** Is a filter selected. */
  readonly isSelect: boolean;
}

const INITIAL_PAGE = 0;
const INPUT_DEBOUNCE_TIME = 500;

/** Table view component. */
@UntilDestroy()
@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableViewComponent implements OnInit {

  /** Total number of records for the current query. */
  public animeListCount = 0;

  /** Number of records per page. */
  public readonly pageSize: number;

  /** All possible type filters. */
  public readonly filterListByType$: Observable<readonly FilterItem[]>;

  private readonly searchChanges$: Observable<string | null>;

  /** Query group. */
  public readonly query: FormGroup<QueryFormControls>;

  private readonly typeFilterChanges$: Observable<AnimeType[] | null>;

  /** Current sort settings. */
  public readonly sort$: BehaviorSubject<TableSort>;

  /** Current page number. */
  public readonly currentPageNumber$: BehaviorSubject<number>;

  /** Table columns names. */
  public readonly displayedColumns: readonly string[] = ['image', 'title-english', 'title-japanese', 'aired-start', 'type', 'status'];

  /** Anime list. */
  public readonly animeList$: Observable<readonly AnimeBase[]>;

  public constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly animeService: AnimeService,
  ) {
    const animeListOptions = this.getAnimeListOptions();

    this.pageSize = animeListOptions.pageSize ?? defaultParams.pageSize;

    const searchInitialValue = animeListOptions.search;
    const typeFilterInitialValue = animeListOptions.types;

    this.query = new FormGroup({
      search: new FormControl(searchInitialValue),
      typeFilter: new FormControl<AnimeType[]>(typeFilterInitialValue),
    });

    this.searchChanges$ = this.query.controls.search.valueChanges.pipe(
      startWith(searchInitialValue),
    );

    this.typeFilterChanges$ = this.query.controls.typeFilter.valueChanges.pipe(
      startWith(typeFilterInitialValue),
    );

    const sortInitialValue: TableSort = {
      field: animeListOptions.ordering,
      direction: animeListOptions.direction,
    };
    this.sort$ = new BehaviorSubject<TableSort>(sortInitialValue);

    this.currentPageNumber$ = new BehaviorSubject<number>(animeListOptions.page);

    this.filterListByType$ = this.getInitialFilterListByType();

    this.animeList$ = this.initializationAnimeList();
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    // When the component is first rendered,
    // it is necessary to save the page number that was passed in the url.
    // In the future, when one of the pagination parameters changes, you need to reset the page.
    const resetCurrentPageNumber$ = this.query.valueChanges.pipe(
      mergeWith(
        this.sort$,
      ),
    );

    resetCurrentPageNumber$.pipe(
      skip(1),
      tap(() => this.currentPageNumber$.next(INITIAL_PAGE)),
      untilDestroyed(this),
    )
      .subscribe();
  }

  /**
   * Handlers pagination change.
   * @param event Paginator event.
   */
  public onPaginationChange(event: PageEvent): void {
    this.currentPageNumber$.next(event.pageIndex);
  }

  /**
   * Handlers sort change.
   * @param sort Sort state.
   */
  public onSortChange(sort: Sort): void {
    // Need to remove the value '' from sort.direction
    this.sort$.next({
      field: sort.active,
      direction: sort.direction === '' ? 'asc' : 'desc',
    });
  }

  /**
   * Tracks anime by ID.
   * @param _index Anime's index into array.
   * @param anime Object of anime.
   */
  public trackItemAnime: TrackByFunction<AnimeBase> = function(_index: number, anime: AnimeBase): number {
    return anime.id;
  };

  /**
   * Tracks type by name.
   * @param _index Anime's index into array.
   * @param type Object of type.
   */
  public trackItemType: TrackByFunction<AnimeType> = function(_index: number, type: AnimeType): AnimeType {
    return type;
  };

  /**
   * Handlers redirect to details page.
   * @param anime Anime record.
   */
  public onDetailsShow(anime: AnimeBase): void {
    this.urlService.navigateToDetails(anime.id);
  }

  /** Gets filter by type. */
  private getInitialFilterListByType(): readonly FilterItem[] {
    const types = this.animeService.getAnimeTypes();

    return types.map(type => ({
      field: type,
      title: type,
      isSelect: false,
    }));
  }

  private initializationAnimeList(): Observable<readonly AnimeBase[]> {
    const paramsChange$ = combineLatest(
      this.searchChanges$,
      this.typeFilterChanges$,
      this.sort$,
    ).pipe(
      debounceTime(INPUT_DEBOUNCE_TIME),
    );

    const params$ = combineLatest(
      paramsChange$,
      this.currentPageNumber$,
    );

    return params$.pipe(
      map(([[search, typeFilter, sort], pageNumber]) => {
        const animeListQueryParams: AnimeListQueryParams = {
          direction: sort.direction,
          ordering: sort.field,
          page: pageNumber,
          pageSize: this.pageSize,
          search: search !== null ? search : '',
          types: typeFilter !== null ? typeFilter : [],
        };

        return animeListQueryParams;
      }),
      tap(animeListParams => this.setQueryParamsToUrl(animeListParams)),
      switchMap(animeListParams => this.animeService.fetchAnimeList(animeListParams)),
      map(animeList => {
        this.animeListCount = animeList.count;
        return animeList.results;
      }),
    );
  }

  private setQueryParamsToUrl(queryParams: AnimeListQueryParams): void {
    const queryParamsForUrl = { ...queryParams, types: queryParams.types.toString() };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParamsForUrl,
      queryParamsHandling: 'merge',
    });
  }

  private getAnimeListOptions(): AnimeListQueryParams {
    const params = this.route.snapshot.queryParams;

    return {
      page: params['page'] ?? defaultParams.page,
      pageSize: params['pageSize'] ?? defaultParams.pageSize,
      search: params['search'] ?? defaultParams.search,
      types: params['types'] !== undefined ? params['types'].split(',') : defaultParams.types,
      ordering: params['ordering'] ?? defaultParams.ordering,
      direction: params['direction'] ?? defaultParams.direction,
    };
  }
}
