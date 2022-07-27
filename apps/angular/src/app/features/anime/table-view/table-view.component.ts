import { map, Observable } from 'rxjs';

import { Component, TrackByFunction } from '@angular/core';
import { AnimeBase } from '@js-camp/core/models/anime';

import { AnimeService } from '../../../../core/services/anime.service';

/** Table view component. */
@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
})
export class TableViewComponent {

  /** Table columns names. */
  public readonly displayedColumns: readonly string[] = ['image', 'title-english', 'title-japanese', 'aired-start', 'type', 'status'];

  /** Anime list. */
  public readonly animeList$: Observable<readonly AnimeBase[]>;

  public constructor(private readonly animeService: AnimeService) {
    this.animeList$ = this.getAnimeList();
  }

  private getAnimeList(): Observable<readonly AnimeBase[]> {
    return this.animeService.fetchAnimeList().pipe(
      map(pagination => pagination.results),
    );
  }

  /**
   * Tracks anime by ID.
   * @param _index Anime's index into array.
   * @param anime Object of hero.
   */
  public trackItem: TrackByFunction<AnimeBase> = (_index: number, anime: AnimeBase): number => anime.id;
}
