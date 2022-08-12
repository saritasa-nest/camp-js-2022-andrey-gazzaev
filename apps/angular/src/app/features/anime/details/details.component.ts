import { map, Observable, switchMap } from 'rxjs';

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
  public readonly trailerUrl$: Observable<SafeResourceUrl>;

  public constructor(
    private readonly dialog: MatDialog,
    private readonly route: ActivatedRoute,
    private readonly sanitizer: DomSanitizer,
    private readonly animeService: AnimeService,
  ) {
    this.anime$ = this.route.params.pipe(
      switchMap(params => this.animeService.fetchAnime(params[PARAM_ID])),
    );

    this.trailerUrl$ = this.anime$.pipe(
      map(anime => {
         // Trailer plays via iframe.
         // Unfortunately, the url of this player is not reliable.
         // But if we want to use the player, we need to trust this url.
         const trailerUrl = `https://www.youtube.com/embed/${anime.trailerYoutubeId}`;
         return this.sanitizer.bypassSecurityTrustResourceUrl(trailerUrl);
      }),
    );
  }

  /**
   * Opens image in modal.
   * @param url Image URL.
   * @param name Image name.
   */
  public openImagePopup(url: string, name: string): void {
    this.dialog.open(ImagePopupComponent, {
      data: {
        url,
        name,
      },
    });
  }
}
