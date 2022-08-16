import { BehaviorSubject, map, merge, Observable, of, ReplaySubject, scan, switchMap, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Studio } from '@js-camp/core/models/studio.dto';
import { StudioDto } from '@js-camp/core/dtos/studio.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { StudioMapper } from '@js-camp/core/mappers/studio.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { AppConfigService } from './app-config.service';

/** Studio service. */
@Injectable({
  providedIn: 'root',
})
export class StudioService {

  private readonly studiosUrl: URL;

  private readonly nextStudios$ = new ReplaySubject<readonly Studio[]>(1);

  private readonly isSearch$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private nextStudiosUrl: string | null = null;

  /** Current Studios. */
  public readonly currentStudios$: Observable<readonly Studio[]>;

  public constructor(
    config: AppConfigService,
    private readonly http: HttpClient,
  ) {
    this.studiosUrl = new URL(`anime/studios/`, config.apiCampBaseUrl);

    const firstStudios$ = this.fetchStudios(this.studiosUrl.toString(), '');
    const nextStudiosActions$ = this.nextStudios$.asObservable();

    const currentStudiosChange$ = merge(
      firstStudios$,
      nextStudiosActions$,
    ).pipe(
      scan((acc, value) => [...acc, ...value]),
    );

    this.currentStudios$ = this.isSearch$.pipe(
      switchMap(isClearStudios => {
        if (!isClearStudios) {
          return currentStudiosChange$;
        }
        return nextStudiosActions$;
      }),
    );
  }

  private fetchStudios(url: string, search: string): Observable<readonly Studio[]> {
    return this.http.get<PaginationDto<StudioDto>>(
      url,
      {
        params: {
          search,
        },
      },
    ).pipe(
      map(pagination => PaginationMapper.fromDto<StudioDto, Studio>(
        pagination,
        studiosDto => StudioMapper.fromDto(studiosDto),
      )),
      tap(studios => {
        this.nextStudiosUrl = studios.next;
      }),
      map(studios => studios.results),
    );
  }

  /** Gets next list of studios. */
  public getMoreStudios(): Observable<readonly Studio[]> {
    return this.fetchStudios(this.nextStudiosUrl ?? this.studiosUrl.toString(), '').pipe(
      tap(studios => this.nextStudios$.next(studios)),
    );
  }

  /**
   * Finds studios by name.
   * @param name Studio name.
   */
  public findStudiosByName(name: string | null): Observable<readonly Studio[] | null> {
    if (name === null || name.length === 0) {
      this.isSearch$.next(false);
      return of(null);
    }

    return this.fetchStudios(this.studiosUrl.toString(), name).pipe(
      tap(studios => {
        this.isSearch$.next(true);
        this.nextStudios$.next(studios);
      }),
    );
  }

  /**
   * Creates studio.
   * @param name Studio name.
   */
  public createStudio(name: string | null): Observable<Studio | null> {
    if (name === null) {
      return of(null);
    }

    const postStudio = StudioMapper.toDto(name);
    return this.http.post<StudioDto>(this.studiosUrl.toString(), postStudio).pipe(
      map(studioDto => StudioMapper.fromDto(studioDto)),
      tap(studios => {
        this.nextStudios$.next([studios]);
      }),
    );
  }

  /**
   * Deletes studio.
   * @param id Studio id.
   */
  public deleteStudio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.studiosUrl.toString()}${id}/`);
  }

  /**
   * Adds studios to current studios.
   * @param studios Studios.
   */
  public addStudios(studios: readonly Studio[]): void {
    this.nextStudios$.next(studios);
  }
}
