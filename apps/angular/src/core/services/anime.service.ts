import { map, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { AnimeBaseDto } from '@js-camp/core/dtos/anime.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeBase, Type } from '@js-camp/core/models/anime';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { AnimeDetails } from '@js-camp/core/models/animeDetails';
import { AnimeDetailsDto } from '@js-camp/core/dtos/animeDetails';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { AnimeListOptions } from '../models/anime-list-options';

import { AppConfigService } from './app-config.service';
import { AnimeListOptionsMapper } from './mappers/anime-list-options.mapper';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {

  private readonly animeListUrl: URL;

  public constructor(
    config: AppConfigService,
    private readonly http: HttpClient,
    private readonly animeListOptionsMapper: AnimeListOptionsMapper,
  ) {
    this.animeListUrl = new URL(`anime/anime/`, config.apiUrl);
  }

  /**
   * Requests to the server to get anime.
   * @param animeListHttpParams Parameters for generating a request.
   */
  public fetchAnimeList(animeListHttpParams: HttpParams): Observable<Pagination<AnimeBase>> {
    return this.http.get<PaginationDto<AnimeBaseDto>>(
      this.animeListUrl.toString(),
      { params: animeListHttpParams },
    ).pipe(map(pagination => PaginationMapper.fromDto<AnimeBaseDto, AnimeBase>(
      pagination,
      animeDto => AnimeMapper.fromDto(animeDto),
    )));
  }

  /**
   * Fetches anime by id.
   * @param id Anime id.
   */
  public fetchAnime(id: number): Observable<AnimeDetails> {
    const animeUrl = new URL(`${id}/`, this.animeListUrl);
    return this.http.get<AnimeDetailsDto>(animeUrl.toString()).pipe(
      map(animeDetailsDto => AnimeMapper.fromDetailsDto(animeDetailsDto)),
    );
  }

  /** Gets all anime types. */
  public getAnimeTypes(): string[] {
    return Object.values(Type);
  }

  /** Gets page limit. */
  public getLimit(): number {
    return this.animeListOptionsMapper.getLimit();
  }

  /** Gets anime list params from URL query params. */
  public getAnimeListOptions(): AnimeListOptions {
    return this.animeListOptionsMapper.fromDto();
  }

  /**
   * Gets URL Anime list options params.
   * @param animeListOptions Anime list options.
   */
  public animeListOptionsToHttpParams(animeListOptions: AnimeListOptions): HttpParams {
    return this.animeListOptionsMapper.toDto(animeListOptions);
  }
}
