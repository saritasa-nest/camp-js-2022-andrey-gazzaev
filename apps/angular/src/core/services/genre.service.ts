import { map, Observable } from 'rxjs';

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

  private readonly genresUrl: URL;

  public constructor(
    config: AppConfigService,
    private readonly http: HttpClient,
  ) {
    this.genresUrl = new URL(`anime/genres/`, config.apiCampBaseUrl);
  }

  /** Gets genres. */
  public fetchGenres(): Observable<readonly Genre[]> {
    return this.http.get<PaginationDto<GenreDto>>(
      this.genresUrl.toString(),
    ).pipe(
      map(pagination => PaginationMapper.fromDto<GenreDto, Genre>(
        pagination,
        genresDto => GenreMapper.fromDto(genresDto),
      )),
      map(genres => genres.results),
    );
  }
}
