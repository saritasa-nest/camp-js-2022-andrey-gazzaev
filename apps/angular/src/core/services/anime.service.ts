import { map, Observable, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Genre } from '@js-camp/core/models/genre';
import { GenreDto } from '@js-camp/core/dtos/genre.dto';
import { Studio } from '@js-camp/core/models/studio.dto';
import { StudioDto } from '@js-camp/core/dtos/studio.dto';
import { DateRange } from '@js-camp/core/models/dateRange';
import { AnimeBaseDto } from '@js-camp/core/dtos/anime.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeBase, Type } from '@js-camp/core/models/anime';
import { AnimeInformation } from '@js-camp/core/models/anime-editor';
import { GenreMapper } from '@js-camp/core/mappers/genre.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { AnimeDetails } from '@js-camp/core/models/animeDetails';
import { AnimeDetailsDto } from '@js-camp/core/dtos/animeDetails';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { StudioMapper } from '@js-camp/core/mappers/studio.mapper';
import { AnimeEditorDto } from '@js-camp/core/dtos/anime-editor.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { AnimeListOptions } from '../models/anime-list-options';

import { AppConfigService } from './app-config.service';
import { AnimeListOptionsMapper } from './mappers/anime-list-options.mapper';
import { S3directService } from './s3direct.service';

interface PostAnimeData {

  /** Information about anime. */
  readonly information: AnimeInformation;

  /** Anime poster. */
  readonly posterData: {

    /** Object file. */
    readonly file: File;

    /** File name. */
    readonly fileName: string;
  };

  /** Aired start date. */
  readonly airedStartDate: Date | null;

  /** Aired end date. */
  readonly airedEndDate: Date | null;
}

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {

  private readonly animeUrl: URL;

  private readonly genresUrl: URL;

  private readonly studiosUrl: URL;

  public constructor(
    config: AppConfigService,
    private readonly http: HttpClient,
    private readonly s3directService: S3directService,
    private readonly animeListOptionsMapper: AnimeListOptionsMapper,
  ) {
    this.genresUrl = new URL(`anime/genres/`, config.apiUrl);
    this.studiosUrl = new URL(`anime/studios/`, config.apiUrl);
    this.animeUrl = new URL(`anime/anime/`, config.apiUrl);
  }

  /**
   * Requests to the server to get anime.
   * @param animeListHttpParams Parameters for generating a request.
   */
  public fetchAnimeList(animeListHttpParams: HttpParams): Observable<Pagination<AnimeBase>> {
    return this.http.get<PaginationDto<AnimeBaseDto>>(
      this.animeUrl.toString(),
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
    const animeUrl = new URL(`${id}/`, this.animeUrl);
    return this.http.get<AnimeDetailsDto>(animeUrl.toString()).pipe(
      map(animeDetailsDto => AnimeMapper.fromDetailsDto(animeDetailsDto)),
    );
  }

  /**
   * Creates anime.
   * @param animeData The anime object to be created.
   */
  public createAnime({ airedStartDate, airedEndDate, posterData, information }: PostAnimeData): Observable<number> {
    const aired = new DateRange({
      end: airedEndDate,
      start: airedStartDate,
    });

    return this.s3directService.uploadAnimePoster(posterData.file, posterData.fileName).pipe(
      map(posterUrl => AnimeMapper.toEditorDto({ ...information, aired, image: posterUrl })),
      switchMap(postAnimeDto => this.http.post<AnimeEditorDto>(this.animeUrl.toString(), postAnimeDto)),
      map(animeEditorDto => animeEditorDto.id),
    );

  }

  /** Fetches genres. */
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

  /** Fetches studios.  */
  public fetchStudios(): Observable<readonly Studio[]> {
    return this.http.get<PaginationDto<StudioDto>>(
      this.studiosUrl.toString(),
    ).pipe(
      map(pagination => PaginationMapper.fromDto<StudioDto, Studio>(
        pagination,
        studioDto => StudioMapper.fromDto(studioDto),
      )),
      map(studios => studios.results),
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
