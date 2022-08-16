import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject, map, merge, Observable, of, ReplaySubject, scan, shareReplay, switchMap, tap } from 'rxjs';

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

  private readonly nextGenres$ = new ReplaySubject<readonly Genre[]>(1);

  private readonly isSearch$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private nextGenresUrl: string | null = null;

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
      shareReplay({ bufferSize: 1, refCount: true }),
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
      tap(genres => {
        this.nextGenresUrl = genres.next;
      }),
      map(genres => genres.results),
    );
  }

  /** Gets next list of genres. */
  public getMoreGenres(): Observable<readonly Genre[]> {
    return this.fetchGenres(this.nextGenresUrl ?? this.genresUrl.toString(), '')
      .pipe(
        tap(genres => {
          this.nextGenres$.next(genres);
        }),
      );
  }

  /**
   * Finds genres by name.
   * @param name Genre name.
   */
  public findGenresByName(name: string | null): Observable<readonly Genre[] | null> {
    if (name === null || name.length === 0) {
      this.isSearch$.next(false);
      return of(null);
    }

    return this.fetchGenres(this.genresUrl.toString(), name).pipe(
      tap(genres => {
        this.isSearch$.next(true);
        this.nextGenres$.next(genres);
      }),
    );
  }

  /**
   * Creates genre.
   * @param name Genre name.
   */
  public createGenre(name: string | null): Observable<Genre | null> {
    if (name === null) {
      return of(null);
    }

    const postGenre = GenreMapper.toDto(name);
    return this.http.post<GenreDto>(this.genresUrl.toString(), postGenre).pipe(
      map(genreDto => GenreMapper.fromDto(genreDto)),
      tap(genres => this.nextGenres$.next([genres])),
    );
  }

  /**
   * Deletes genre.
   * @param id Genre id.
   */
  public deleteGenre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.genresUrl.toString()}${id}/`);
  }

  /**
   * Adds genres to current genres.
   * @param genres Genres.
   */
  public addGenres(genres: readonly Genre[]): void {
    this.nextGenres$.next(genres);
  }
}
