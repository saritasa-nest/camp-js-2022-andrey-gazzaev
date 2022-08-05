import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { AnimeDetails } from '@js-camp/core/models/animeDetails';

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
  public readonly safeTrailerUrl$ = new BehaviorSubject<SafeResourceUrl>('');

  public constructor(
    private readonly dialog: MatDialog,
    private readonly route: ActivatedRoute,
    private readonly sanitizer: DomSanitizer,
    private readonly animeService: AnimeService,
  ) {
    this.anime$ = this.route.params.pipe(
      switchMap(params => this.animeService.fetchAnime(params[PARAM_ID])),
      tap(anime => {
        const trailerUrl = `https://www.youtube.com/embed/${anime.trailerYoutubeId}`;
        return this.safeTrailerUrl$.next(
          this.sanitizer.bypassSecurityTrustResourceUrl(trailerUrl),
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
