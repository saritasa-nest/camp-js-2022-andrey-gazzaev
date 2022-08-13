import { filter, first, map, merge, Observable, ReplaySubject, scan, Subject, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre } from '@js-camp/core/models/genre';
import { GenreDto } from '@js-camp/core/dtos/genre.dto';
import { GenreMapper } from '@js-camp/core/mappers/genre.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { AppConfigService } from './app-config.service';

/** Genre service. */
@Injectable({
  providedIn: 'root',
})
export class GenreService {

  private readonly nextGenresUrl$ = new ReplaySubject<string | null>(1);

  private readonly nextGenres$: Subject<readonly Genre[]> = new Subject();

  /** Current genres. */
  public readonly currentGenres$: Observable<readonly Genre[]>;

  public constructor(
    config: AppConfigService,
    private readonly http: HttpClient,
  ) {
    const genresUrl = new URL(`anime/genres/`, config.apiCampBaseUrl);

    const firstGenres$ = this.fetchGenres(genresUrl.toString());
    const nextGenresActions$ = this.nextGenres$.asObservable();

    this.currentGenres$ = merge(
      firstGenres$,
      nextGenresActions$,
    ).pipe(
      scan((acc, value) => [...acc, ...value]),
    );
  }

  private fetchGenres(url: string): Observable<readonly Genre[]> {
    return this.http.get<PaginationDto<GenreDto>>(
      url,
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
      switchMap(nextGenresUrl => this.fetchGenres(nextGenresUrl)),
      map(genres => this.nextGenres$.next(genres)),
    )
      .subscribe();
  }

}
