import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { AnimeDetails } from '@js-camp/core/models/animeDetails';

import { AnimeService } from '../../../../core/services/anime.service';

import { ImagePopupComponent } from './image-popup/image-popup.component';

/** Anime details component. */
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {

  /** Anime details. */
  public readonly anime$: Observable<AnimeDetails>;

  /**  */
  public readonly safeURL$ = new BehaviorSubject<SafeResourceUrl>('');

  public constructor(
    private readonly dialog: MatDialog,
    private readonly sanitizer: DomSanitizer,
    private readonly animeService: AnimeService,
  ) {
    this.anime$ = this.animeService.fetchAnime(2).pipe(
      tap(anime => this.safeURL$.next(
        this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${anime.trailerYoutubeId}`),
      )),
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
