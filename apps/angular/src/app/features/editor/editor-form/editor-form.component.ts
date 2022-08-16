import { catchError, combineLatest, debounceTime, defer, filter, iif, map, merge, Observable, of, ReplaySubject, Subscriber, switchMap, tap, throwError } from 'rxjs';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AppError } from '@js-camp/core/models/app-error';
import { DateRange } from '@js-camp/core/models/dateRange';
import { FormError } from '@js-camp/core/models/form-error';
import { AnimeStatus, AnimeType } from '@js-camp/core/models/anime';
import { isFieldsDefined } from '@js-camp/core/utils/guards/general.guard';
import { AnimeEditor, AnimeInformation, Rating, Season, Source } from '@js-camp/core/models/anime-editor';

import { UrlService } from '../../../../core/services/url.service';
import { AnimeService } from '../../../../core/services/anime.service';
import { GenreService } from '../../../../core/services/genre.service';
import { StudioService } from '../../../../core/services/studio.service';
import { showErrorsFormFields } from '../../../../core/utils/show-errors';

interface DateRangeControls {

  /** Date start. */
  readonly start: FormControl<Date | null>;

  /** Date end. */
  readonly end: FormControl<Date | null>;
}

interface AnimeFormControls {

  /** Anime poster control. */
  readonly image: FormControl<File | null>;

  /** Trailer youtube id control. */
  readonly trailerYoutubeId: FormControl<string | null>;

  /** Title of English control. */
  readonly titleEnglish: FormControl<string>;

  /** Title of Japanese control. */
  readonly titleJapanese: FormControl<string>;

  /** Synopsis control. */
  readonly synopsis: FormControl<string>;

  /** Type control. */
  readonly type: FormControl<AnimeType | null>;

  /** Status control. */
  readonly status: FormControl<AnimeStatus | null>;

  /** Source control. */
  readonly source: FormControl<Source | null>;

  /** Season control. */
  readonly season: FormControl<Season | null>;

  /** Rating control. */
  readonly rating: FormControl<Rating | null>;

  /** Is airing. */
  readonly isAiring: FormControl<boolean>;

  /** Aired date range. */
  readonly aired: FormGroup<DateRangeControls>;

  /** Genres control. */
  readonly genres: FormControl<readonly number[]>;

  /** Genres search control. */
  readonly genresSearch: FormControl<string>;

  /** Studios control. */
  readonly studios: FormControl<readonly number[]>;

  /** Genres search control. */
  readonly studiosSearch: FormControl<string>;
}

interface StatusInformation {

  /** Anime types. */
  readonly types: readonly AnimeType[];

  /** Anime statuses. */
  readonly statuses: readonly AnimeStatus[];

  /** Anime seasons. */
  readonly seasons: readonly Season[];

  /** Anime ratings. */
  readonly ratings: readonly Rating[];

  /** Anime sources. */
  readonly sources: readonly Source[];
}

const SEARCH_DEBOUNCE_TIME = 500;

/** Editor component. */
@UntilDestroy()
@Component({
  selector: 'app-editor-form',
  templateUrl: './editor-form.component.html',
  styleUrls: ['./editor-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorFormComponent implements OnInit {

  /** Anime form. */
  public readonly animeForm: FormGroup<AnimeFormControls>;

  /** All kinds of anime genres. */
  public readonly genres$ = this.genreService.currentGenres$;

  /** All kinds of anime studios. */
  public readonly studios$ = this.studioService.currentStudios$;

  /** Information about anime.  */
  public readonly statusInformation$: Observable<StatusInformation>;

  /** URL to anime poster preview. */
  public readonly currentPosterPreview$: Observable<string | null>;

  /** Checks if the editor is open in anime editing mode. */
  public isEditAnime = false;

  private readonly posterPreview$ = new ReplaySubject<string | null>(1);

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly urlService: UrlService,
    private readonly animeService: AnimeService,
    private readonly genreService: GenreService,
    private readonly studioService: StudioService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.animeForm = this.initAnimeForm();

    const posterChange$ = this.animeForm.controls.image.valueChanges.pipe(
      filter((file): file is NonNullable<File> => file !== null),
      switchMap(file => this.previewPoster(file)),
    );

    this.currentPosterPreview$ = merge(
      this.posterPreview$,
      posterChange$,
    );

    this.statusInformation$ = this.getStatusInformation();
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    const animeId = this.route.snapshot.params['id'];
    if (animeId !== undefined) {
      const animeSet$ = this.animeService.fetchAnimeEditor(animeId).pipe(
        tap(animeEditor => {
          this.isEditAnime = true;
          this.setInitValuesToAnimeForm(animeEditor);
          this.genreService.addGenres(animeEditor.genresData);
          this.studioService.addStudios(animeEditor.studiosData);
        }),
      );

      animeSet$.pipe(
        map(animeEditor => animeEditor.image),
        map(posterUrl => this.posterPreview$.next(posterUrl)),
        untilDestroyed(this),
      )
        .subscribe();

    } else {
      this.posterPreview$.next(null);
    }

    const genresSearchChanges$ = this.animeForm.controls.genresSearch.valueChanges.pipe(
      debounceTime(SEARCH_DEBOUNCE_TIME),
      map(search => this.genreService.findGenresByName(search)),
      untilDestroyed(this),
    );

    const genresStudiosChanges$ = this.animeForm.controls.studiosSearch.valueChanges.pipe(
      debounceTime(SEARCH_DEBOUNCE_TIME),
      map(search => this.studioService.findStudiosByName(search)),
      untilDestroyed(this),
    );

    merge(
      genresSearchChanges$,
      genresStudiosChanges$,
    )
      .subscribe();
  }

  /** Handlers form submit. */
  public onFormSubmit(): void {
    this.animeForm.markAllAsTouched();
    if (this.animeForm.invalid) {
      return;
    }

    const amineInformation = this.getAnimeInformation();
    if (amineInformation === null) {
      return;
    }

    const { image, aired } = this.animeForm.getRawValue();

    const anime = {
      id: this.route.snapshot.params['id'],
      information: amineInformation,
      aired: new DateRange({ ...aired }),
    };

    const posterFileAction$ = this.animeService.savePoster(image).pipe(
      switchMap(posterUrl => this.animeService.saveAnime({ ...anime, posterUrl })),
    );

    const posterUrlAction$ = this.currentPosterPreview$.pipe(
      switchMap(posterUrl => this.animeService.saveAnime({ ...anime, posterUrl })),
    );

    const animeActions$ = iif(() => image !== null, posterFileAction$, posterUrlAction$);

    animeActions$.pipe(
      map(id => this.urlService.navigateToDetails(id)),
      untilDestroyed(this),
      catchError((error: unknown) => {
        if (error instanceof AppError) {
          return of(this.setErrors(error));
        }
        return throwError(() => error);
      }),
    )
      .subscribe();

  }

  /** Handlers get more genres. */
  public onMoreGenres(): void {
    this.genreService.getMoreGenres();
  }

  /** Handlers create genre. */
  public onCreateGenre(): void {
    const search = this.animeForm.controls.genresSearch.value;
    this.genreService.createGenre(search);
  }

  /**
   * Handlers remove genre.
   * @param id Genre id.
   */
  public onRemoveGenre(id: number): void {
    this.genreService.deleteGenre(id);
    const genresIds = this.animeForm.controls.genres.value;
    if (genresIds !== null) {
      this.animeForm.controls.genres.setValue(genresIds.filter(genreId => genreId !== id));
    }

    this.animeForm.controls.genresSearch.setValue('');
  }

  /** Handlers get more studios. */
  public onMoreStudios(): void {
    this.studioService.getMoreStudios();
  }

  /** Handlers create studio. */
  public onCreateStudio(): void {
    const search = this.animeForm.controls.studiosSearch.value;
    this.studioService.createStudio(search);
  }

  /**
   * Handlers remove studio.
   * @param id Studio id.
   */
  public onRemoveStudio(id: number): void {
    this.studioService.deleteStudio(id);
    const studioIds = this.animeForm.controls.studios.value;
    if (studioIds !== null) {
      this.animeForm.controls.studios.setValue(studioIds.filter(studioId => studioId !== id));
    }

    this.animeForm.controls.studiosSearch.setValue('');
  }

  /** Handlers remove current poster. */
  public onRemoveCurrentPoster(): void {
    this.posterPreview$.next(null);
    this.animeForm.controls.image.setValue(null);
  }

  private getAnimeInformation(): AnimeInformation | null {
    const {
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

    const requiredFields = {
      rating, season, source, status, type,
    };

    if (!isFieldsDefined(requiredFields)) {
      return null;
    }

    return {
      ...requiredFields,
      trailerYoutubeId,
      studios,
      synopsis,
      titleEnglish,
      titleJapanese,
      genres,
      isAiring,
    };
  }

  private setErrors(errors: AppError<FormError<AnimeEditor>>): void {
    showErrorsFormFields(errors, this.animeForm);
    this.changeDetectorRef.markForCheck();
  }

  private setInitValuesToAnimeForm(animeEditor: AnimeEditor): void {
    this.animeForm.patchValue({
      ...animeEditor,
      image: null,
      genresSearch: '',
      studiosSearch: '',
    });
  }

  private initAnimeForm(): FormGroup<AnimeFormControls> {
    return new FormGroup<AnimeFormControls>({
      image: new FormControl(null),
      trailerYoutubeId: new FormControl(null),
      titleEnglish: new FormControl('', { nonNullable: true }),
      titleJapanese: new FormControl('', { nonNullable: true }),
      synopsis: new FormControl('', { validators: Validators.required, nonNullable: true }),
      type: new FormControl(null, { validators: Validators.required }),
      status: new FormControl(null, { validators: Validators.required }),
      source: new FormControl(null, { validators: Validators.required }),
      rating: new FormControl(null, { validators: Validators.required }),
      season: new FormControl(null, { validators: Validators.required }),
      isAiring: new FormControl(false, { nonNullable: true }),
      genres: new FormControl([], { validators: Validators.required, nonNullable: true }),
      studios: new FormControl([], { validators: Validators.required, nonNullable: true }),
      genresSearch: new FormControl('', { validators: Validators.required, nonNullable: true }),
      studiosSearch: new FormControl('', { validators: Validators.required, nonNullable: true }),
      aired: new FormGroup<DateRangeControls>({
        start: new FormControl(null),
        end: new FormControl(null),
      }),
    });
  }

  private getStatusInformation(): Observable<StatusInformation> {
    return combineLatest([
      defer(() => this.animeService.getAnimeTypes()),
      defer(() => this.animeService.getAnimeStatus()),
      defer(() => this.animeService.getSeason()),
      defer(() => this.animeService.getRating()),
      defer(() => this.animeService.getSource()),
    ]).pipe(
      map(([types, statuses, seasons, ratings, sources]) => ({
        types,
        statuses,
        seasons,
        ratings,
        sources,
      })),
    );
  }

  private previewPoster(posterFile: File): Observable<
    string |
    null
  > {
    const reader = new FileReader();

    reader.readAsDataURL(posterFile);

    return new Observable((observer: Subscriber<string | null>): void => {
      reader.onload = () => {
        const result = reader.result instanceof ArrayBuffer ? null : reader.result;
        observer.next(result);
        observer.complete();
      };
    });
  }
}
