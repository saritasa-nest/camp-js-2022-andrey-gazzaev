import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Genre } from '@js-camp/core/models/genre';
import { Studio } from '@js-camp/core/models/studio.dto';

import { AnimeService } from '../../../../core/services/anime.service';

/** Editor component. */
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  /** All kinds of anime genres. */
  public readonly genres$: Observable<readonly Genre[]>;

  /** All kinds of anime genres. */
  public readonly studios$: Observable<readonly Studio[]>;

  public constructor(private readonly animeService: AnimeService) {
    this.genres$ = this.animeService.fetchGenres();
    this.studios$ = this.animeService.fetchStudios();
  }

}
