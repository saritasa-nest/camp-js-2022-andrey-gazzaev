import { map, Observable } from 'rxjs';

import { Component } from '@angular/core';
import { AnimeBase } from '@js-camp/core/models/anime';

import { AnimeService } from '../../../../core/services/anime.service';

/** Table view component. */
@Component({
  selector: 'anime-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
})
export class TableViewComponent {

  /** Table columns names. */
  public readonly displayedColumns: readonly string[] = ['image', 'title-english', 'title-japanese', 'aired-start', 'type', 'status'];

  /** Anime list. */
  public readonly animeList$: Observable<readonly AnimeBase[]> | undefined;

  public constructor(private readonly animeService: AnimeService) {
    this.animeList$ = this.getAnimeList();
  }

  private getAnimeList(): Observable<readonly AnimeBase[]> {
    return this.animeService.fetchAnimeList().pipe(
      map(pagination => pagination.results),
    );
  }
}
