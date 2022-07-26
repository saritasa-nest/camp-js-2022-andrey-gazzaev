import { map, Observable } from 'rxjs';

import { Component } from '@angular/core';
import { Sort, SortDirection } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

import { AnimeBase } from '@js-camp/core/models/anime';

import { AnimeService } from '../../../../core/services/anime.service';

interface TableSort {
  field: string;
  ordering: SortDirection;
}

/** Table view component. */
@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
})
export class TableViewComponent {

  /** Current page number. */
  public animeListCount = 0;

  /** Current page number. */
  public currentPage = 0;

  /** Current page number. */
  public pageSize = 0;

  public sort: TableSort = {
    field: 'title_eng',
    ordering: 'asc',
  }

  /** Table columns names. */
  public readonly displayedColumns: readonly string[] = ['image', 'title-english', 'title-japanese', 'aired-start', 'type', 'status'];

  /** Anime list. */
  public animeList$: Observable<readonly AnimeBase[]> | undefined;

  public constructor(private readonly animeService: AnimeService) {
    this.animeList$ = this.getAnimeList();
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
    this.sort.ordering = sort.direction === '' ? 'asc' : 'desc';

    this.animeList$ = this.getAnimeList();
  }

  private getAnimeList(): Observable<readonly AnimeBase[]> {
    return this.animeService.fetchAnimeList(this.currentPage, this.sort).pipe(map(pagination => {
      this.animeListCount = pagination.count;
      this.pageSize = pagination.results.length;
      return pagination.results;
    }));
  }
}
