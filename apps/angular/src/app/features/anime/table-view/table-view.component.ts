import { map, Observable } from 'rxjs';

import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { AnimeBase } from '@js-camp/core/models/anime';

import { AnimeService } from '../../../../core/services/anime.service';

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

  /** Table columns names. */
  public readonly displayedColumns: readonly string[] = ['image', 'title-english', 'title-japanese', 'aired-start', 'type', 'status'];

  /** Anime list. */
  public animeList$: Observable<readonly AnimeBase[]> | undefined;

  public constructor(private readonly animeService: AnimeService) {
    this.animeList$ = this.getAnimeList(this.currentPage);
  }

  /**
   * Handlers paginator change.
   * @param event Paginator event.
   */
  public handlePage(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.animeList$ = this.getAnimeList(this.currentPage);
  }

  private getAnimeList(pageNumber: number): Observable<readonly AnimeBase[]> {
    return this.animeService.fetchAnimeList(pageNumber).pipe(map(pagination => {
      this.animeListCount = pagination.count;
      this.pageSize = pagination.results.length;
      return pagination.results;
    }));
  }
}
