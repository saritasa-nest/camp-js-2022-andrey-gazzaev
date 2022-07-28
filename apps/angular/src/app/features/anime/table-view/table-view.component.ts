import { BehaviorSubject, combineLatestWith, debounceTime, map, Observable, startWith, switchMap } from 'rxjs';

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
  public pageSize = 0;

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
    this.fillFilterListByType();

    const params$ = this.search.valueChanges.pipe(
      startWith(''),
      combineLatestWith(
        this.currentPageNumber$,
        this.typeFilter.valueChanges.pipe(
          startWith(['TV']),
        ),
        this.sort$,
      ),
      debounceTime(500),
    );

    this.animeList$ = params$.pipe(
      switchMap(([search, pageNumber, typeFilter, sort]) => this.animeService.fetchAnimeList({
        pageNumber,
        sort,
        filter: { byType: typeFilter ? typeFilter : ['TV'] },
        search: search ? search : '',
      })),
      map(pagination => {
        this.animeListCount = pagination.count;
        this.pageSize = pagination.results.length;
        return pagination.results;
      }),
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

  private fillFilterListByType(): void {
    const types = this.animeService.getAnimeTypes();

    this.filterListByType = types.map(type => ({
      field: type,
      title: type,
      isSelect: false,
    }));
  }
}
