import { BehaviorSubject, combineLatestWith, debounceTime, ignoreElements, map, merge, mergeWith, Observable, skip, startWith, switchMap, tap } from 'rxjs';

import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChangeDetectionStrategy, Component, OnInit, TrackByFunction } from '@angular/core';

import { AnimeBase, Type } from '@js-camp/core/models/anime';

import { goToTop } from '../../../../core/utils/animations';
import { UrlService } from '../../../../core/services/url.service';
import { AnimeService } from '../../../../core/services/anime.service';
import { AnimeListOptions } from '../../../../core/models/anime-list-options';

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

  /** Anime list options. */
  private readonly animeListOptions = this.animeService.getAnimeListOptions();

  /** Total number of records for the current query. */
  public animeListCount = 0;

  private readonly pageSizeInitialValue = this.animeListOptions.limit ?? this.animeService.getLimit();

  /** Number of records per page. */
  public readonly pageSize = this.pageSizeInitialValue;

  /** All possible type filters. */
  public readonly filterListByType = this.getInitialFilterListByType();

  private readonly searchInitialValue = this.animeListOptions.search;

  /** Value of search input. */
  public readonly search = new FormControl(this.searchInitialValue);

  private readonly search$ = this.search.valueChanges.pipe(
    startWith(this.searchInitialValue),
  );

  private readonly typeFilterInitialValue = this.animeListOptions.filter.byType;

  /** Filter by type. */
  public readonly typeFilter = new FormControl<Type[]>(this.typeFilterInitialValue);

  private readonly typeFilter$ = this.typeFilter.valueChanges.pipe(
    startWith(this.typeFilterInitialValue),
  );

  private readonly sortInitialValue: TableSort = {
    field: this.animeListOptions.sort.field,
    direction: this.animeListOptions.sort.direction === 'desc' ? 'desc' : 'asc',
  };

  /** Current sort settings. */
  public readonly sort$ = new BehaviorSubject<TableSort>(this.sortInitialValue);

  private readonly currentPageNumberInitialValue = this.animeListOptions.pageNumber;

  /** Current page number. */
  public readonly currentPageNumber$ = new BehaviorSubject<number>(this.currentPageNumberInitialValue);

  /** Table columns names. */
  public readonly displayedColumns: readonly string[] = ['image', 'title-english', 'title-japanese', 'aired-start', 'type', 'status'];

  /** Anime list. */
  public readonly animeList$: Observable<readonly AnimeBase[]>;

  public constructor(
    private readonly urlService: UrlService,
    private readonly animeService: AnimeService,
  ) {
    this.animeList$ = this.initializationAnimeList();
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    // When the component is first rendered,
    // it is necessary to save the page number that was passed in the url.
    // In the future, when one of the pagination parameters changes, you need to reset the page.
    const resetCurrentPageNumberSideEffect$ = this.typeFilter$.pipe(
      skip(1),
      mergeWith(
        this.search$.pipe(skip(1)),
        this.sort$.pipe(skip(1)),
      ),
      tap(() => this.currentPageNumber$.next(INITIAL_PAGE)),
    );

    merge(
      resetCurrentPageNumberSideEffect$,
    ).pipe(
      ignoreElements(),
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
    const paramsChange$ = this.search$.pipe(
      combineLatestWith(
        this.typeFilter$,
        this.sort$,
      ),
      debounceTime(INPUT_DEBOUNCE_TIME),
    );

    const params$ = paramsChange$.pipe(
      combineLatestWith(this.currentPageNumber$),
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
