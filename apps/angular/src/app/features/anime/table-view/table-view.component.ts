import { BehaviorSubject, combineLatestWith, debounceTime, map, Observable, startWith, switchMap, tap } from 'rxjs';

import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';
import { ChangeDetectionStrategy, Component, TrackByFunction, ViewEncapsulation } from '@angular/core';

import { AnimeBase } from '@js-camp/core/models/anime';

import { AnimeService } from '../../../../core/services/anime.service';

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

const DEFAULT_SORT_FIELD = 'title_eng';
const DEFAULT_SORT_DIRECTION = 'asc';
const INITIAL_PAGE = 0;
const INPUT_DEBOUNCE_TIME = 500;

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
  public readonly animeList$: Observable<readonly AnimeBase[]>;

  public constructor(private readonly animeService: AnimeService) {
    this.setFilterListByType();
    this.setPageSize();
    this.setInputValues();

    const paramsChange$ = this.search.valueChanges.pipe(
      startWith(this.search.value),
      combineLatestWith(
        this.typeFilter.valueChanges.pipe(
          startWith(this.typeFilter.value),
        ),
        this.sort$,
      ),
      tap(() => this.currentPageNumber$.next(INITIAL_PAGE)),
      debounceTime(INPUT_DEBOUNCE_TIME),
    );

    const params$ = paramsChange$.pipe(
      combineLatestWith(this.currentPageNumber$),
    );

    this.animeList$ = params$.pipe(
      switchMap(([[search, typeFilter, sort], pageNumber]) => {
        const animeListOption = {
          pageNumber,
          sort,
          filter: { byType: typeFilter !== null ? typeFilter : ['TV'] },
          search: search !== null ? search : '',
          limit: this.pageSize,
        };
        const animeListHttpParams = this.animeService.getAnimeListHttpParams(animeListOption);
        this.animeService.setUrl(animeListHttpParams.toString());
        return this.animeService.fetchAnimeList(animeListHttpParams);
      }),
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
  public trackItem: TrackByFunction<AnimeBase> = function (_index: number, anime: AnimeBase): number {
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

  private setInputValues(): void {
    const animeListOption = this.animeService.getAnimeListOptions();
    this.currentPageNumber$.next(animeListOption.pageNumber);
    this.sort$.next({ field: animeListOption.sort.field, direction: animeListOption.sort.direction === 'desc' ? 'desc' : 'asc' });
    this.search.setValue(animeListOption.search);
    this.typeFilter.setValue(animeListOption.filter.byType);
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
