import { BehaviorSubject, combineLatestWith, debounceTime, map, Observable, startWith, switchMap, tap } from 'rxjs';

import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';
import { ChangeDetectionStrategy, Component, TrackByFunction, ViewEncapsulation } from '@angular/core';

import { AnimeBase } from '@js-camp/core/models/anime';

import { AnimeService } from '../../../../core/services/anime.service';

interface TableSort {

  /** The field by which to sort. */
  field: string;

  /** The sort order. */
  direction: SortDirection;
}

interface FilterItem {

  /** Key of filter. */
  field: string;

  /** Name of filter. */
  title: string;

  /** Is a filter selected. */
  isSelect: boolean;
}

const DEFAULT_SORT_FIELD = 'title_eng';
const DEFAULT_SORT_DIRECTION = 'asc';

/** Table view component. */
@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableViewComponent {

  /** Total number of records for the current query. */
  public animeListCount = 0;

  /** Number of records per page. */
  public pageSize = 5;

  /** All possible type filters. */
  public filterListByType: FilterItem[] = [];

  /** Value of search input. */
  public readonly search = new FormControl('');

  /** Filter by type. */
  public readonly typeFilter = new FormControl<string[]>(['TV']);

  /** Current sort settings. */
  public readonly sort$ = new BehaviorSubject<TableSort>({
    field: DEFAULT_SORT_FIELD,
    direction: DEFAULT_SORT_DIRECTION,
  });

  /** Current page number. */
  public readonly currentPageNumber$ = new BehaviorSubject<number>(0);

  /** Table columns names. */
  public readonly displayedColumns: readonly string[] = ['image', 'title-english', 'title-japanese', 'aired-start', 'type', 'status'];

  /** Anime list. */
  public readonly animeList$: Observable<readonly AnimeBase[]> | undefined;

  public constructor(private readonly animeService: AnimeService) {
    this.setFilterListByType();
    this.setPageSize();

    const params$ = this.currentPageNumber$.pipe(
      combineLatestWith(
        this.search.valueChanges.pipe(
          startWith(''),
          tap(() => this.currentPageNumber$.next(0)),
        ),
        this.typeFilter.valueChanges.pipe(
          startWith(['TV']),
          tap(() => this.currentPageNumber$.next(0)),
        ),
        this.sort$,
      ),
      debounceTime(500),
    );

    this.animeList$ = params$.pipe(
      switchMap(([pageNumber, search, typeFilter, sort]) => this.animeService.fetchAnimeList({
        pageNumber,
        sort,
        filter: { byType: typeFilter !== null ? typeFilter : ['TV'] },
        search: search !== null ? search : '',
        limit: this.pageSize,
      })),
      map(animeList => {
        this.animeListCount = animeList.count;
        return animeList.results;
      }),
      tap(() => this.goToTop()),
    );
  }

  /**
   * Handlers pagination change.
   * @param event Paginator event.
   */
  public handlePaginationChange(event: PageEvent): void {
    this.currentPageNumber$.next(event.pageIndex);
  }

  /**
   * Handlers sort change.
   * @param sort Sort state.
   */
  public handleSortChange(sort: Sort): void {
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

  /** Sets filter by type. */
  private setFilterListByType(): void {
    const types = this.animeService.getAnimeTypes();

    this.filterListByType = types.map(type => ({
      field: type,
      title: type,
      isSelect: false,
    }));
  }

  /** Sets page size. */
  private setPageSize(): void {
    this.pageSize = this.animeService.getLimit();
  }

  /** Go to top page. */
  private goToTop(): void {
    const TOP_OF_PAGE = 0;
    const SCROLL_EVENT = 'smooth';

    window.scrollTo({
      top: TOP_OF_PAGE,
      behavior: SCROLL_EVENT,
    });
  }
}
