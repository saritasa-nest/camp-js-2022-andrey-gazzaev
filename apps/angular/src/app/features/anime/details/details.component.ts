import { Component } from '@angular/core';
import { AnimeDetails } from '@js-camp/core/models/animeDetails';
import { Observable } from 'rxjs';

import { AnimeService } from '../../../../core/services/anime.service';

/** Anime details component. */
@Component({
  selector: 'camp-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {

  /** Anime details. */
  public readonly anime$: Observable<AnimeDetails>;

  public constructor(private readonly animeService: AnimeService) {
    this.anime$ = this.animeService.fetchAnime(1);
  }

}
