import { catchError, combineLatest, debounceTime, defer, filter, iif, map, merge, Observable, of, ReplaySubject, Subscriber, switchMap, tap } from 'rxjs';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DateRange } from '@js-camp/core/models/dateRange';
import { AnimeStatus, AnimeType } from '@js-camp/core/models/anime';
import { isFieldsDefined } from '@js-camp/core/utils/guards/general.guard';
import { AnimeEditor, Rating, Season, Source } from '@js-camp/core/models/anime-editor';

import { UrlService } from '../../../../core/services/url.service';
import { AnimeService } from '../../../../core/services/anime.service';
import { GenreService } from '../../../../core/services/genre.service';
import { StudioService } from '../../../../core/services/studio.service';

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
  readonly titleEnglish: FormControl<string | null>;

  /** Title of Japanese control. */
  readonly titleJapanese: FormControl<string | null>;

  /** Synopsis control. */
  readonly synopsis: FormControl<string | null>;

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
  readonly isAiring: FormControl<boolean | null>;

  /** Aired date range. */
  readonly aired: FormGroup<DateRangeControls>;

  /** Genres control. */
  readonly genres: FormControl<readonly number[] | null>;

  /** Genres search control. */
  readonly genresSearch: FormControl<string | null>;

  /** Studios control. */
  readonly studios: FormControl<readonly number[] | null>;

  /** Genres search control. */
  readonly studiosSearch: FormControl<string | null>;
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

  private readonly posterPreview$ = new ReplaySubject<string | null>(1);

  /** URL to anime poster preview. */
  public readonly currentPosterPreview$: Observable<
    string |
    null
  >;

  /** Checks if the editor is open in anime editing mode. */
  public isEditAnime = false;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly urlService: UrlService,
    private readonly animeService: AnimeService,
    private readonly genreService: GenreService,
    private readonly studioService: StudioService,
  ) {
    this.animeForm = this.initAnimeForm();

    const posterChange$ = this.animeForm.controls.image.valueChanges.pipe(
      filter((file): file is NonNullable<File> => file !== null),
      switchMap(file => this.previewPoster(file)),
    );

    this.currentPosterPreview$ = merge(
      this.posterPreview$,
      posterChange$,
    ).pipe(
      map(poster => poster),
    );

    this.animeForm.controls.genresSearch.valueChanges.pipe(
      debounceTime(500),
      map(search => this.genreService.findGenresByName(search)),
      untilDestroyed(this),
    )
      .subscribe();

    this.animeForm.controls.studiosSearch.valueChanges.pipe(
      debounceTime(500),
      map(search => this.studioService.findStudiosByName(search)),
      untilDestroyed(this),
    )
      .subscribe();

    this.statusInformation$ = combineLatest([
      this.getTypes(),
      this.getStatuses(),
      this.getSeasons(),
      this.getRatings(),
      this.getSource(),
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

  /** @inheritdoc */
  public ngOnInit(): void {
    const animeId = this.route.snapshot.params['id'];
    if (animeId !== undefined) {
      this.animeService.fetchAnimeEditor(animeId).pipe(
        tap(animeEditor => {
          this.isEditAnime = true;
          this.setInitValuesToAnimeForm(animeEditor);
          this.genreService.addGenres(animeEditor.genresData);
          this.studioService.addStudios(animeEditor.studiosData);
        }),
        map(animeEditor => animeEditor.image),
        map(posterUrl => this.posterPreview$.next(posterUrl)),
        untilDestroyed(this),
      )
        .subscribe();
    } else {
      this.posterPreview$.next(null);
    }

  }

  /** Handlers form submit. */
  public onFormSubmit(): void {
    this.animeForm.markAllAsTouched();
    if (this.animeForm.invalid) {
      return;
    }

    const {
      image,
      aired,
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
      rating, season, source, status, synopsis, type, studios, genres, isAiring, titleEnglish, titleJapanese,
    };

    if (!isFieldsDefined(requiredFields)) {
      return;
    }

    const amineInformation = {
      ...requiredFields,
      trailerYoutubeId,
    };

    const animeId = this.route.snapshot.params['id'];

    const posterFileAction$ = this.animeService.savePoster(image).pipe(
      switchMap(posterUrl => this.animeService.saveAnime({
        id: animeId,
        information: amineInformation,
        posterUrl,
        aired: aired as DateRange,
      })),
    );

    const posterUrlAction$ = this.currentPosterPreview$.pipe(
      switchMap(posterUrl => this.animeService.saveAnime({
        id: animeId,
        information: amineInformation,
        posterUrl,
        aired: aired as DateRange,
      })),
    );

    const animeActions$ = iif(() => image !== null, posterFileAction$, posterUrlAction$);

    animeActions$.pipe(
      map(id => this.urlService.navigateToDetails(id)),
      untilDestroyed(this),
      catchError((error: unknown) => {
        console.error(error);
        return of(null);
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

  private setInitValuesToAnimeForm({
    trailerYoutubeId,
    titleEnglish,
    titleJapanese,
    synopsis,
    type,
    status,
    source,
    rating,
    season,
    isAiring,
    genres,
    studios,
    aired,
  }: AnimeEditor): void {
    this.animeForm.setValue({
      image: null,
      trailerYoutubeId,
      titleEnglish,
      titleJapanese,
      synopsis,
      type,
      status,
      source,
      rating,
      season,
      isAiring,
      genres,
      studios,
      genresSearch: '',
      studiosSearch: '',
      aired,
    });
  }

  private initAnimeForm(): FormGroup<AnimeFormControls> {
    return new FormGroup<AnimeFormControls>({
      image: new FormControl(null),
      trailerYoutubeId: new FormControl(null),
      titleEnglish: new FormControl(null, Validators.required),
      titleJapanese: new FormControl(null, Validators.required),
      synopsis: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      source: new FormControl(null, Validators.required),
      rating: new FormControl(null, Validators.required),
      season: new FormControl(null, Validators.required),
      isAiring: new FormControl(false),
      genres: new FormControl(null, Validators.required),
      studios: new FormControl(null, Validators.required),
      genresSearch: new FormControl(null),
      studiosSearch: new FormControl(null),
      aired: new FormGroup<DateRangeControls>({
        start: new FormControl(null),
        end: new FormControl(null),
      }),
    });
  }

  private getTypes(): Observable<AnimeType[]> {
    return defer(() => this.animeService.getAnimeTypes());
  }

  private getStatuses(): Observable<AnimeStatus[]> {
    return defer(() => this.animeService.getAnimeStatus());
  }

  private getRatings(): Observable<Rating[]> {
    return defer(() => this.animeService.getRating());
  }

  private getSource(): Observable<Source[]> {
    return defer(() => this.animeService.getSource());
  }

  private getSeasons(): Observable<Season[]> {
    return defer(() => this.animeService.getSeason());
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
