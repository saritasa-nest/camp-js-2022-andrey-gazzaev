import { BehaviorSubject, combineLatest, debounceTime, defer, map, merge, Observable, skip, startWith, switchMap, tap } from 'rxjs';

import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Sort, SortDirection } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AnimeListQueryParams } from '@js-camp/core/models/anime-list-query-params';
import { AnimeBase, AnimeType, AnimeSortField, AnimeSortDirection } from '@js-camp/core/models/anime';

import { AnimeService } from '../../../../core/services/anime.service';
import { UrlService } from '../../../../core/services/url.service';

const defaultParams: AnimeListQueryParams = {
  page: 0,
  pageSize: 25,
  search: '',
  types: [AnimeType.Tv],
  sort: {
    field: AnimeSortField.TitleJapanese,
    direction: AnimeSortDirection.Ascending,
  },
};

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

interface FilterItem {

  /** Key of filter. */
  readonly field: string;

  /** Name of filter. */
  readonly title: string;

  /** Is a filter selected. */
  readonly isSelect: boolean;
}

interface AnimeList {

  /** Total anime count. */
  readonly totalAnimeCount: number;

  /** List of anime. */
  readonly list: readonly AnimeBase[];
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

  /** Number of records per page. */
  public readonly pageSize: number;

  /** All possible type filters. */
  public readonly filterListByType$: Observable<readonly FilterItem[]>;

  /** Query group. */
  public readonly queryForm: FormGroup<QueryFormControls>;

  /** Current sort settings. */
  public readonly sort$: BehaviorSubject<TableSort>;

  /** Current page number. */
  public readonly currentPageNumber$: BehaviorSubject<number>;

  /** Table columns names. */
  public readonly displayedColumns: readonly string[] = ['image', 'title-english', 'title-japanese', 'aired-start', 'type', 'status'];

  /** Anime list. */
  public readonly animeList$: Observable<AnimeList>;

  public constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly urlService: UrlService,
    private readonly formBuilder: FormBuilder,
    private readonly animeService: AnimeService,
  ) {
    const animeListOptions = this.getAnimeListOptions();

    this.pageSize = animeListOptions.pageSize ?? defaultParams.pageSize;

    this.queryForm = this.formBuilder.nonNullable.group({
      search: [animeListOptions.search],
      typeFilter: [animeListOptions.types],
    });

    this.sort$ = new BehaviorSubject<TableSort>({
      field: animeListOptions.sort.field,
      direction: animeListOptions.sort.direction === 'asc' ? 'asc' : 'desc',
    });

    this.currentPageNumber$ = new BehaviorSubject<number>(animeListOptions.page);

    this.filterListByType$ = this.getInitialFilterListByType();

    this.animeList$ = this.initializeAnimeList();
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    // When the component is first rendered,
    // it is necessary to save the page number that was passed in the url.
    // In the future, when one of the pagination parameters changes, you need to reset the page.
    const skipFirstRender$ = merge(
      this.queryForm.valueChanges,
      this.sort$,
    ).pipe(
      skip(1),
    );

    skipFirstRender$.pipe(
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
      field: sort.active as AnimeSortField,
      direction: sort.direction === '' ? 'asc' : 'desc',
    });
  }

  /**
   * Tracks anime by ID.
   * @param index Anime's index into array.
   * @param anime Object of anime.
   */
  public trackAnime(index: number, anime: AnimeBase): number {
    return anime.id;
  }

  /**
   * Tracks type by name.
   * @param index Anime's index into array.
   * @param type Object of type.
   */
  public trackType(index: number, type: FilterItem): string {
    return type.field;
  }

  /**
   * Handlers redirect to details page.
   * @param anime Anime record.
   */
  public onDetailsShow(anime: AnimeBase): void {
    this.urlService.navigateToDetails(anime.id);
  }

  /** Gets filter by type. */
  private getInitialFilterListByType(): Observable<FilterItem[]> {
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

  private initializeAnimeList(): Observable<AnimeList> {
    const animeListOptions = this.getAnimeListOptions();

    const searchChanges$ = this.queryForm.controls.search.valueChanges.pipe(
      startWith(animeListOptions.search),
    );

    const typeFilterChanges$ = this.queryForm.controls.typeFilter.valueChanges.pipe(
      startWith(animeListOptions.types),
    );

    const paramsChange$ = combineLatest([
      searchChanges$,
      typeFilterChanges$,
      this.sort$,
    ]).pipe(
      debounceTime(INPUT_DEBOUNCE_TIME),
    );

    const params$ = combineLatest([
      paramsChange$,
      this.currentPageNumber$,
    ]).pipe(
      map(([[search, typeFilter, sort], pageNumber]) => {
        const animeListQueryParams: AnimeListQueryParams = {
          sort: {
            direction: sort.direction === 'asc' ? AnimeSortDirection.Ascending : AnimeSortDirection.Descending,
            field: sort.field,
          },
          page: pageNumber,
          pageSize: this.pageSize,
          search,
          types: typeFilter,
        };

        return animeListQueryParams;
      }),
    );

    const setUrl$ = params$.pipe(
      tap(animeListParams => this.setQueryParamsToUrl(animeListParams)),
    );

    return setUrl$.pipe(
      switchMap(animeListParams => this.animeService.fetchAnimeList(animeListParams)),
      map(({ results, totalEntriesCount }) => ({ list: results, totalAnimeCount: totalEntriesCount })),
    );
  }

  private setQueryParamsToUrl({ page, pageSize, search, sort, types }: AnimeListQueryParams): void {
    const queryParamsForUrl = { page, pageSize, search, types: types.toString(), field: sort.field, direction: sort.direction };
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
      sort: {
        field: params['field'] ?? defaultParams.sort.field,
        direction: params['direction'] ?? defaultParams.sort.direction,
      },
    };
  }
}
