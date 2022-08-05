import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';

import { Component, SecurityContext } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

import { AnimeDetails } from '@js-camp/core/models/animeDetails';

import { UrlService } from '../../../../core/services/url.service';
import { AnimeService } from '../../../../core/services/anime.service';

import { ImagePopupComponent } from './image-popup/image-popup.component';

const PARAM_ID = 'id';

/** Anime details component. */
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {

  /** Anime details. */
  public readonly anime$: Observable<AnimeDetails>;

  /** Trailer url. */
  public readonly safeTrailerUrl$ = new BehaviorSubject<string | null>('');

  public constructor(
    private readonly dialog: MatDialog,
    private readonly route: ActivatedRoute,
    private readonly urlService: UrlService,
    private readonly sanitizer: DomSanitizer,
    private readonly animeService: AnimeService,
  ) {
    this.anime$ = this.route.params.pipe(
      switchMap(params => this.animeService.fetchAnime(params[PARAM_ID])),
      tap(anime => {
        const trailerUrl = `https://www.youtube.com/embed/${anime.trailerYoutubeId}`;
        return this.safeTrailerUrl$.next(
          this.sanitizer.sanitize(SecurityContext.URL, trailerUrl),
        );
      }),
    );
  }

  /**
   * Opens image in modal.
   * @param url Image URL.
   */
  public openImagePopup(url: string): void {
    this.dialog.open(ImagePopupComponent, {
      data: {
        url,
      },
    });
  }
}
