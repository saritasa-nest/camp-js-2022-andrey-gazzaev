import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, first, map, merge, Observable, ReplaySubject, scan, Subject, switchMap, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Studio } from '@js-camp/core/models/studio.dto';
import { StudioDto } from '@js-camp/core/dtos/studio.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { StudioMapper } from '@js-camp/core/mappers/studio.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { AppConfigService } from './app-config.service';

/** Studio service. */
@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class StudioService {

  private readonly studiosUrl: URL;

  private readonly nextStudiosUrl$ = new ReplaySubject<string | null>(1);

  private readonly nextStudios$: Subject<readonly Studio[]> = new Subject();

  private readonly isSearch$: BehaviorSubject<boolean> = new BehaviorSubject(false);

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
      map(studios => {
        this.nextStudiosUrl$.next(studios.next);
        return studios.results;
      }),
    );
  }

  /** Gets next list of studios. */
  public getMoreStudios(): void {
    this.nextStudiosUrl$.pipe(
      first(),
      filter((nextStudiosUrl): nextStudiosUrl is NonNullable<string | null> => nextStudiosUrl !== null),
      switchMap(nextStudiosUrl => this.fetchStudios(nextStudiosUrl, '')),
      map(studios => this.nextStudios$.next(studios)),
      untilDestroyed(this),
    )
      .subscribe();
  }

  /**
   * Finds studios by name.
   * @param name Studio name.
   */
  public findStudiosByName(name: string | null): void {
    if (name === null || name.length === 0) {
      this.isSearch$.next(false);
      return;
    }

    this.fetchStudios(this.studiosUrl.toString(), name).pipe(
      tap(() => this.isSearch$.next(true)),
      map(studios => this.nextStudios$.next(studios)),
      untilDestroyed(this),
    )
      .subscribe();
  }

  /**
   * Creates studio.
   * @param name Studio name.
   */
  public createStudio(name: string | null): void {
    if (name === null) {
      return;
    }

    const postStudio = StudioMapper.toDto(name);
    this.http.post<StudioDto>(this.studiosUrl.toString(), postStudio).pipe(
      map(studioDto => StudioMapper.fromDto(studioDto)),
      map(studios => this.nextStudios$.next([studios])),
      untilDestroyed(this),
    )
      .subscribe();
  }

  /**
   * Deletes studio.
   * @param id Studio id.
   */
  public deleteStudio(id: number): void {
    this.http.delete(`${this.studiosUrl.toString()}${id}/`)
      .pipe(
        untilDestroyed(this),
      )
      .subscribe();
  }
}
