import { map, Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';

import { AnimeBase } from '@js-camp/core/models/anime';

import arraysEqual from '../../../../core/utils/array-equal';
import { AnimeService } from '../../../../core/services/anime.service';

interface TableSort {

  /** The field by which to sort. */
  field: string;

  /** The sort order. */
  direction: SortDirection;
}

interface TableFilter {

  /** Collection of values by type. */
  byType: string[];
}

interface FilterCell {

  /** Key of filter. */
  field: string;

  /** Name of filter. */
  title: string;

  /** Is a filter selected. */
  isSelect: boolean;
}

const DEFAULT_SORT_FIELD = 'title_eng';
const DEFAULT_SORT_ORDERING = 'asc';

/** Table view component. */
@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableViewComponent {

  /** Total number of records for the current query. */
  public animeListCount = 0;

  /** Current page number. */
  public currentPage = 0;

  /** Number of records per page. */
  public pageSize = 0;

  /** Current sort settings. */
  public sort: TableSort = {
    field: DEFAULT_SORT_FIELD,
    direction: DEFAULT_SORT_ORDERING,
  };

  /** All possible type filters. */
  public filterListByType: FilterCell[] = [];

  /** Selected filter. */
  public filter: TableFilter = {
    byType: [],
  };

  /** Value of search input. */
  public search = '';

  /** Table columns names. */
  public readonly displayedColumns: readonly string[] = ['image', 'title-english', 'title-japanese', 'aired-start', 'type', 'status'];

  /** Anime list. */
  public animeList$: Observable<readonly AnimeBase[]>;

  public constructor(private readonly animeService: AnimeService) {
    this.animeList$ = this.getAnimeList();
    this.fillFilterListByType();
  }

  /**
   * Handlers pagination change.
   * @param event Paginator event.
   */
  public handlePaginationChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;

    this.animeList$ = this.getAnimeList();
  }

  /**
   * Handlers pagination change.
   * @param sort Paginator event.
   */
  public handleSortChange(sort: Sort): void {
    this.sort.field = sort.active;

    // Need to remove the value '' from sort.direction
    this.sort.direction = sort.direction === '' ? 'asc' : 'desc';

    this.animeList$ = this.getAnimeList();
  }

  /** Handles filter change. */
  public handleFilterChange(): void {
    const newFilter = this.filterListByType
      .filter(filter => filter.isSelect)
      .map(filter => filter.field);

    if (arraysEqual<String>(this.filter.byType, newFilter)) {
      return;
    }

    this.filter.byType = newFilter;
    this.animeList$ = this.getAnimeList();
  }

  /** Handles search input change. */
  public handleSearchChange(): void {
    this.animeList$ = this.getAnimeList();
  }

  private getAnimeList(): Observable<readonly AnimeBase[]> {
    return this.animeService.fetchAnimeList({
      pageNumber: this.currentPage,
      sort: this.sort,
      filter: this.filter,
      search: this.search,
    })
      .pipe(
        map(pagination => {
          this.animeListCount = pagination.count;
          this.pageSize = pagination.results.length;
          return pagination.results;
        }),
      );
  }

  private fillFilterListByType(): void {
    const types = this.animeService.getAnimeTypes();

    this.filterListByType = types.map(type => ({
      field: type,
      title: type,
      isSelect: false,
    }));
  }
}
