import { catchError, debounceTime, defer, filter, map, Observable, of, Subscriber, switchMap } from 'rxjs';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DateRange } from '@js-camp/core/models/dateRange';
import { AnimeStatus, AnimeType } from '@js-camp/core/models/anime';
import { isFieldsDefined } from '@js-camp/core/utils/guards/general.guard';
import { Rating, Season, Source } from '@js-camp/core/models/anime-editor';

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
  readonly poster: FormControl<File | null>;

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
  readonly genres: FormControl<number[] | null>;

  /** Genres search control. */
  readonly genresSearch: FormControl<string | null>;

  /** Studios control. */
  readonly studios: FormControl<number[] | null>;

  /** Genres search control. */
  readonly studiosSearch: FormControl<string | null>;
}

/** Editor component. */
@UntilDestroy()
@Component({
  selector: 'app-editor-form',
  templateUrl: './editor-form.component.html',
  styleUrls: ['./editor-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorFormComponent {

  /** Anime form. */
  public readonly animeForm: FormGroup<AnimeFormControls>;

  /** All kinds of anime genres. */
  public readonly genres$ = this.genreService.currentGenres$;

  /** All kinds of anime studios. */
  public readonly studios$ = this.studioService.currentStudios$;

  /** Anime types. */
  public readonly types$ = this.getTypes();

  /** Anime statuses. */
  public readonly statuses$ = this.getStatuses();

  /** Anime seasons. */
  public readonly seasons$ = this.getSeasons();

  /** Anime ratings. */
  public readonly ratings$ = this.getRatings();

  /** Anime sources. */
  public readonly sources$ = this.getSource();

  /** URL to anime poster preview. */
  public readonly posterPreview$: Observable<
    string |
    ArrayBuffer |
    null
  >;

  public constructor(
    private readonly urlService: UrlService,
    private readonly animeService: AnimeService,
    private readonly genreService: GenreService,
    private readonly studioService: StudioService,
  ) {
    this.animeForm = this.initAnimeForm();

    this.posterPreview$ = this.animeForm.controls.poster.valueChanges.pipe(
      filter((file): file is NonNullable<File> => file !== null),
      switchMap(file => this.previewPoster(file)),
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
  }

  /** Handlers form submit. */
  public onFormSubmit(): void {
    this.animeForm.markAllAsTouched();
    if (this.animeForm.invalid) {
      return;
    }

    const {
      poster: image,
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
      rating: requiredField.rating,
      season: requiredField.season,
      source: requiredField.source,
      status: requiredField.status,
      synopsis: requiredField.synopsis,
      titleEnglish,
      titleJapanese,
      trailerYoutubeId,
      type: requiredField.type,
      genres: requiredField.genres,
      studios: requiredField.studios,
    };

    this.animeService.createAnime({
      information: amineInformation,
      posterData,
      aired: aired as DateRange,
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

  /**
   * Checks if the search string is empty.
   * @param search Some search query.
   */
  public isNotSearch(search: string | null): boolean {
    return search === null || search.length === 0;
  }

  private initAnimeForm(): FormGroup<AnimeFormControls> {
    return new FormGroup<AnimeFormControls>({
      poster: new FormControl(null, Validators.required),
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
    ArrayBuffer |
    null
  > {
    const reader = new FileReader();

    reader.readAsDataURL(posterFile);

    return new Observable((observer: Subscriber<string | ArrayBuffer | null>): void => {
      reader.onload = () => {
        observer.next(reader.result);
        observer.complete();
      };
    });
  }
}
