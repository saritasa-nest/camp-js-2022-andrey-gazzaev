import { filter, map, Observable, switchMap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Genre } from '@js-camp/core/models/genre';
import { Studio } from '@js-camp/core/models/studio.dto';
import { AnimeDetails } from '@js-camp/core/models/animeDetails';

import { UrlService } from '../../../../core/services/url.service';
import { AnimeService } from '../../../../core/services/anime.service';

import { ImagePopupComponent } from './image-popup/image-popup.component';
import { ActionConfirmationDialogComponent } from './action-confirmation-dialog/action-confirmation-dialog.component';

const PARAM_ID = 'id';

/** Anime details component. */
@UntilDestroy()
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
    private readonly urlService: UrlService,
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
  public openImagePopup(url: string | null, name: string): void {
    this.dialog.open(ImagePopupComponent, {
      data: {
        url,
        name,
      },
    });
  }

  /**
   * Tracks anime by ID.
   * @param _index Anime's index into array.
   * @param genre Object of genre.
   */
  public trackGenre(_index: number, genre: Genre): number {
    return genre.id;
  }

  /**
   * Tracks anime by ID.
   * @param _index Anime's index into array.
   * @param studio Object of studio.
   */
  public trackStudio(_index: number, studio: Studio): number {
    return studio.id;
  }

  /**
   * Handlers anime delete.
   * @param id ID anime.
   */
  public onDeleteAnime(id: number): void {
    this.openDialog().pipe(
      filter(value => value),
      switchMap(() => this.animeService.deleteAnime(id)),
      map(() => this.urlService.navigateToHome()),
      untilDestroyed(this),
    )
      .subscribe();
  }

  private openDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(ActionConfirmationDialogComponent);

    return dialogRef.afterClosed();
  }
}
