import { Observable } from 'rxjs';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Genre } from '@js-camp/core/models/genre';
import { Studio } from '@js-camp/core/models/studio.dto';
import { Status, Type } from '@js-camp/core/models/anime';

import { AnimeService } from '../../../../core/services/anime.service';

interface AnimeFormControls {

  /** Trailer youtube id. */
  readonly trailerYoutubeId: FormControl<string>;

  /** Title of English . */
  readonly titleEnglish: FormControl<string>;

  /** Title of Japanese. */
  readonly titleJapanese: FormControl<string>;

  /** Type. */
  readonly type: FormControl<string>;

  /** Type. */
  readonly status: FormControl<string>;

  /** Is airing. */
  readonly isAiring: FormControl<boolean>;
}

interface AiredFormControls {

  /** Start date. */
  readonly start: FormControl<Date>;

  /** End date. */
  readonly end: FormControl<Date>;
}

/** Editor component. */
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {

  /** Anime form. */
  public readonly animeForm: FormGroup<AnimeFormControls>;

  /** Aired form group. */
  public readonly airedForm: FormGroup<AiredFormControls>;

  /** All kinds of anime genres. */
  public readonly genres$: Observable<readonly Genre[]>;

  /** All kinds of anime studios. */
  public readonly studios$: Observable<readonly Studio[]>;

  /** All kinds of anime types. */
  public readonly types: string[];

  /**  All kinds of anime status. */
  public readonly statusList: string[];

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly animeService: AnimeService,
  ) {
    this.types = Object.values(Type);
    this.statusList = Object.values(Status);

    this.animeForm = this.initAnimeForm();
    this.airedForm = this.initAiredForm();
    this.genres$ = this.animeService.fetchGenres();
    this.studios$ = this.animeService.fetchStudios();

  }

  private initAnimeForm(): FormGroup<AnimeFormControls> {
    return this.formBuilder.nonNullable.group({
      trailerYoutubeId: ['1dy2zPPrKD0'],
      titleEnglish: ['Naruto Shippuden'],
      titleJapanese: ['ナルト- 疾風伝'],
      type: ['TV', Validators.required],
      status: ['AIRING', Validators.required],
      isAiring: [true, Validators.required],
    }, { updateOn: 'blur' });
  }

  private initAiredForm(): FormGroup<AiredFormControls> {
    return this.formBuilder.nonNullable.group({
      start: [new Date(), Validators.required],
      end: [new Date(), Validators.required],
    });
  }
}
