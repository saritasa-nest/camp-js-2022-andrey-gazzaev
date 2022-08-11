import { BehaviorSubject, combineLatest, debounceTime, map, mergeWith, Observable, skip, startWith, switchMap, tap } from 'rxjs';

import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChangeDetectionStrategy, Component, OnInit, TrackByFunction } from '@angular/core';

import { AnimeBase, Type } from '@js-camp/core/models/anime';

import { goToTop } from '../../../../core/utils/animations';
import { UrlService } from '../../../../core/services/url.service';
import { AnimeService } from '../../../../core/services/anime.service';
import { AnimeListOptions } from '../../../../core/models/anime-list-options';

interface QueryFormControls {

  /** Filter by type. */
  readonly typeFilter: FormControl<Type[] | null>;

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
  public readonly filterListByType: readonly FilterItem[];

  private readonly searchChanges$: Observable<string | null>;

  /** Query group. */
  public readonly query: FormGroup<QueryFormControls>;

  private readonly typeFilterChanges$: Observable<Type[] | null>;

  /** Current sort settings. */
  public readonly sort$: BehaviorSubject<TableSort>;

  /** Current page number. */
  public readonly currentPageNumber$: BehaviorSubject<number>;

  /** Table columns names. */
  public readonly displayedColumns: readonly string[] = ['image', 'title-english', 'title-japanese', 'aired-start', 'type', 'status'];

  /** Anime list. */
  public readonly animeList$: Observable<readonly AnimeBase[]>;

  public constructor(
    private readonly urlService: UrlService,
    private readonly animeService: AnimeService,
  ) {
    const animeListOptions = this.animeService.getAnimeListOptions();

    this.pageSize = animeListOptions.limit ?? this.animeService.getLimit();

    const searchInitialValue = animeListOptions.search;
    const typeFilterInitialValue = animeListOptions.filter.byType;

    this.query = new FormGroup({
      search: new FormControl(searchInitialValue),
      typeFilter: new FormControl<Type[]>(typeFilterInitialValue),
    });

    this.searchChanges$ = this.query.controls.search.valueChanges.pipe(
      startWith(searchInitialValue),
    );

    this.typeFilterChanges$ = this.query.controls.typeFilter.valueChanges.pipe(
      startWith(typeFilterInitialValue),
    );

    const sortInitialValue: TableSort = {
      field: animeListOptions.sort.field,
      direction: animeListOptions.sort.direction === 'desc' ? 'desc' : 'asc',
    };
    this.sort$ = new BehaviorSubject<TableSort>(sortInitialValue);

    this.currentPageNumber$ = new BehaviorSubject<number>(animeListOptions.pageNumber);

    this.filterListByType = this.getInitialFilterListByType();

    this.animeList$ = this.initializationAnimeList();
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    // When the component is first rendered,
    // it is necessary to save the page number that was passed in the url.
    // In the future, when one of the pagination parameters changes, you need to reset the page.
    const resetCurrentPageNumberSideEffect$ = this.query.valueChanges.pipe(
      mergeWith(
        this.sort$,
      ),
    );

    resetCurrentPageNumberSideEffect$.pipe(
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
   * @param anime Object of hero.
   */
  public trackItem: TrackByFunction<AnimeBase> = function(_index: number, anime: AnimeBase): number {
    return anime.id;
  };

  /** Gets filter by type. */
  private getInitialFilterListByType(): FilterItem[] {
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
        const animeListOption = new AnimeListOptions({
          pageNumber,
          sort,
          filter: { byType: typeFilter !== null ? typeFilter : [] },
          search: search !== null ? search : '',
          limit: this.pageSize,
        });
        return this.animeService.animeListOptionsToHttpParams(animeListOption);
      }),
      tap(animeListParams => this.urlService.setUrl(animeListParams)),
      switchMap(animeListParams => this.animeService.fetchAnimeList(animeListParams)),
      map(animeList => {
        this.animeListCount = animeList.count;
        return animeList.results;
      }),
      tap(() => goToTop()),
    );
  }
}
