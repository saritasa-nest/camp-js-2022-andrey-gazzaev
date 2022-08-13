import { catchError, filter, map, Observable, of, Subscriber, switchMap } from 'rxjs';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Status, Type } from '@js-camp/core/models/anime';
import { isFieldsDefined } from '@js-camp/core/utils/guards/general.guard';
import { Rating, Season, Source } from '@js-camp/core/models/anime-editor';

import { UrlService } from '../../../../core/services/url.service';
import { AnimeService } from '../../../../core/services/anime.service';

interface SelectItem {

  /** ID. */
  id: string | number;

  /** Item name. */
  name: string;
}

interface AnimeFormControls {

  /** Trailer youtube id. */
  readonly image: FormControl<File | null>;

  /** Trailer youtube id. */
  readonly trailerYoutubeId: FormControl<string | null>;

  /** Title of English . */
  readonly titleEnglish: FormControl<string | null>;

  /** Title of Japanese. */
  readonly titleJapanese: FormControl<string | null>;

  /** Synopsis. */
  readonly synopsis: FormControl<string | null>;

  /** Type. */
  readonly type: FormControl<string | null>;

  /** */
  readonly status: FormControl<string | null>;

  /** */
  readonly source: FormControl<string | null>;

  /** */
  readonly season: FormControl<string | null>;

  /** */
  readonly rating: FormControl<string | null>;

  /** Is airing. */
  readonly isAiring: FormControl<boolean | null>;

  /** Start date. */
  readonly airedStartDate: FormControl<Date | null>;

  /** End date. */
  readonly airedEndDate: FormControl<Date | null>;

  /** */
  readonly genres: FormControl<number[] | null>;

  /** */
  readonly studios: FormControl<number[] | null>;
}

/** Editor component. */
@UntilDestroy()
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {

  /** Anime form. */
  public readonly animeForm: FormGroup<AnimeFormControls>;

  /** All kinds of anime genres. */
  public readonly genres$ = this.animeService.fetchGenres();

  /** All kinds of anime studios. */
  public readonly studios$ = this.animeService.fetchStudios();

  /**  */
  public readonly types = this.createSelectCollection(Type);

  /**  */
  public readonly statuses = this.createSelectCollection(Status);

  /**  */
  public readonly seasons = this.createSelectCollection(Season);

  /**  */
  public readonly ratings = this.createSelectCollection(Rating);

  /**   */
  public readonly sources = this.createSelectCollection(Source);

  /**  */
  public readonly imagePreview$: Observable<string |
    ArrayBuffer |
    null>;

  public constructor(
    private readonly urlService: UrlService,
    private readonly animeService: AnimeService,
  ) {
    this.animeForm = this.initAnimeForm();
    this.imagePreview$ = this.animeForm.controls.image.valueChanges.pipe(
      filter((file): file is NonNullable<File> => file !== null),
      switchMap(file => this.previews(file)),
    );
  }

  private previews(imageFile: File): Observable<
    string |
    ArrayBuffer |
    null
  > {
    const reader = new FileReader();

    reader.readAsDataURL(imageFile);

    return new Observable((observer: Subscriber<string | ArrayBuffer | null>): void => {
      reader.onload = () => {
        observer.next(reader.result);
        observer.complete();
      };
    });
  }

  /** Handles form submit. */
  public onFormSubmit(): void {
    this.animeForm.markAllAsTouched();
    if (this.animeForm.invalid) {
      return;
    }

    const {
      image,
      airedEndDate,
      airedStartDate,
      genres,
      isAiring,
      rating,
      season,
      source,
      status,
      studios,
      synopsis,
      titleEnglish,
      titleJapanese,
      trailerYoutubeId,
      type,
    } = this.animeForm.getRawValue();

    const requiredField = {
      rating, season, source, status, synopsis, type, studios, genres, isAiring, image,
    };

    if (!isFieldsDefined(requiredField)) {
      return;
    }

    const posterData = {
      file: requiredField.image,
      fileName: requiredField.image.name,
    };

    const amineInformation = {
      isAiring: requiredField.isAiring,
      rating: requiredField.rating as Rating,
      season: requiredField.season as Season,
      source: requiredField.source as Source,
      status: requiredField.status as Status,
      synopsis: requiredField.synopsis,
      titleEnglish,
      titleJapanese,
      trailerYoutubeId,
      type: requiredField.type as Type,
      genres: requiredField.genres,
      studios: requiredField.studios,
    };

    this.animeService.createAnime({
      information: amineInformation,
      posterData,
      airedStartDate,
      airedEndDate,
    }).pipe(
      untilDestroyed(this),
      map(id => this.urlService.navigateToDetails(id)),
      catchError((error: unknown) => {
        console.error(error);
        return of(null);
      }),
    )
      .subscribe();
  }

  private createSelectCollection<T>(obj: T): readonly SelectItem[] {
    return Object.values(obj).map(value => ({
      id: value,
      name: value,
    }));
  }

  private initAnimeForm(): FormGroup<AnimeFormControls> {
    return new FormGroup<AnimeFormControls>({
      image: new FormControl(null, Validators.required),
      trailerYoutubeId: new FormControl(null),
      titleEnglish: new FormControl(null),
      titleJapanese: new FormControl(null),
      synopsis: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      source: new FormControl(null, Validators.required),
      rating: new FormControl(null, Validators.required),
      season: new FormControl(null, Validators.required),
      isAiring: new FormControl(false),
      airedStartDate: new FormControl(null),
      airedEndDate: new FormControl(null),
      genres: new FormControl(null, Validators.required),
      studios: new FormControl(null, Validators.required),
    });
  }
}
