import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { AnimeDetails } from '@js-camp/core/models/animeDetails';

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

  /**  */
  public readonly safeURL$ = new BehaviorSubject<SafeResourceUrl>('');

  public constructor(private readonly animeService: AnimeService, private readonly sanitizer: DomSanitizer) {
    this.anime$ = this.animeService.fetchAnime(1).pipe(
      tap(anime => this.safeURL$.next(
        this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${anime.trailerYoutubeId}`),
      )),
    );
  }

}
