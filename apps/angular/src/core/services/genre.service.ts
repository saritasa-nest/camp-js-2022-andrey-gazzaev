import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, first, map, merge, Observable, ReplaySubject, scan, Subject, switchMap, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre } from '@js-camp/core/models/genre';
import { GenreDto } from '@js-camp/core/dtos/genre.dto';
import { GenreMapper } from '@js-camp/core/mappers/genre.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { AppConfigService } from './app-config.service';

/** Genre service. */
@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class GenreService {

  private readonly genresUrl: URL;

  private readonly nextGenresUrl$ = new ReplaySubject<string | null>(1);

  private readonly nextGenres$: Subject<readonly Genre[]> = new Subject();

  private readonly isSearch$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /** Current genres. */
  public readonly currentGenres$: Observable<readonly Genre[]>;

  public constructor(
    config: AppConfigService,
    private readonly http: HttpClient,
  ) {
    this.genresUrl = new URL(`anime/genres/`, config.apiCampBaseUrl);

    const firstGenres$ = this.fetchGenres(this.genresUrl.toString(), '');
    const nextGenresActions$ = this.nextGenres$.asObservable();

    const currentGenresChange$ = merge(
      firstGenres$,
      nextGenresActions$,
    ).pipe(
      scan((acc, value) => [...acc, ...value]),
    );

    this.currentGenres$ = this.isSearch$.pipe(
      switchMap(isClearGenres => {
        if (!isClearGenres) {
          return currentGenresChange$;
        }
        return nextGenresActions$;
      }),
    );
  }

  private fetchGenres(url: string, search: string): Observable<readonly Genre[]> {
    return this.http.get<PaginationDto<GenreDto>>(
      url,
      {
        params: {
          search,
        },
      },
    ).pipe(
      map(pagination => PaginationMapper.fromDto<GenreDto, Genre>(
        pagination,
        genresDto => GenreMapper.fromDto(genresDto),
      )),
      map(genres => {
        this.nextGenresUrl$.next(genres.next);
        return genres.results;
      }),
    );
  }

  /** Gets next list of genres. */
  public getMoreGenres(): void {
    this.nextGenresUrl$.pipe(
      first(),
      filter((nextGenresUrl): nextGenresUrl is NonNullable<string | null> => nextGenresUrl !== null),
      switchMap(nextGenresUrl => this.fetchGenres(nextGenresUrl, '')),
      map(genres => this.nextGenres$.next(genres)),
      untilDestroyed(this),
    )
      .subscribe();
  }

  /**
   * Finds genres by name.
   * @param name Genre name.
   */
  public findGenresByName(name: string | null): void {
    if (name === null || name.length === 0) {
      this.isSearch$.next(false);
      return;
    }

    this.fetchGenres(this.genresUrl.toString(), name).pipe(
      tap(() => this.isSearch$.next(true)),
      map(genres => this.nextGenres$.next(genres)),
      untilDestroyed(this),
    )
      .subscribe();
  }

  /**
   * Creates genre.
   * @param name Genre name.
   */
  public createGenre(name: string | null): void {
    if (name === null) {
      return;
    }

    const postGenre = GenreMapper.toDto(name);
    this.http.post<GenreDto>(this.genresUrl.toString(), postGenre).pipe(
      map(genreDto => GenreMapper.fromDto(genreDto)),
      map(genres => this.nextGenres$.next([genres])),
      untilDestroyed(this),
    )
      .subscribe();
  }

  /**
   * Deletes genre.
   * @param id Genre id.
   */
  public deleteGenre(id: number): void {
    this.http.delete(`${this.genresUrl.toString()}${id}/`)
      .pipe(
        untilDestroyed(this),
      )
      .subscribe();
  }

}
