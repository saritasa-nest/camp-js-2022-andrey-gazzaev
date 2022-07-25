import { map, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AnimeBase } from '@js-camp/core/models/anime';
import { AnimeBaseDto } from '@js-camp/core/dtos/anime.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { AppConfigService } from './app-config.service';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {

  private readonly animeListUrl: URL;

  public constructor(
    private readonly http: HttpClient,
    private readonly config: AppConfigService,
  ) {
    this.animeListUrl = new URL(`anime/anime/`, this.config.apiUrl);
  }

  /** Request to the server to get anime. */
  public fetchAnimeList(): Observable<Pagination<AnimeBase>> {
    return this.http.get<PaginationDto<AnimeBaseDto>>(this.animeListUrl.toString())
      .pipe(
        map(
          pagination => PaginationMapper.fromDto<AnimeBaseDto, AnimeBase>(
            pagination,
            animeDto => AnimeMapper.fromDto(animeDto),
          ),
        ),
      );
  }
}
