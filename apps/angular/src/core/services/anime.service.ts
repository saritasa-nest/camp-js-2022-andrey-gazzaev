import { map, Observable, of } from 'rxjs';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { DateRange } from '@js-camp/core/models/dateRange';
import { AnimeBaseDto } from '@js-camp/core/dtos/anime.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { AnimeDetails } from '@js-camp/core/models/animeDetails';
import { AnimeDetailsDto } from '@js-camp/core/dtos/animeDetails';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeEditorDto } from '@js-camp/core/dtos/anime-editor.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeBase, AnimeStatus, AnimeType } from '@js-camp/core/models/anime';
import { AnimeEditor, AnimeInformation, PostAnime, PutAnime, Rating, Season, Source } from '@js-camp/core/models/anime-editor';

import { AnimeListQueryParams } from '../models/anime-list-query-params';

import { AppConfigService } from './app-config.service';
import { AnimeListOptionsMapper } from './mappers/anime-list-options.mapper';
import { S3directService } from './s3direct.service';

interface AnimeData {

  /** ID. */
  readonly id?: number;

  /** Information about anime. */
  readonly information: AnimeInformation;

  /** Anime poster. */
  readonly posterUrl: string | null;

  /** Aired date range. */
  readonly aired: DateRange;
}

/** Anime service. */
@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class AnimeService {

  private readonly animeListUrl: URL;

  public constructor(
    config: AppConfigService,
    private readonly http: HttpClient,
    private readonly s3directService: S3directService,
    private readonly animeListOptionsMapper: AnimeListOptionsMapper,
  ) {
    this.animeListUrl = new URL(`anime/anime/`, config.apiCampBaseUrl);
  }

  /**
   * Requests to the server to get anime.
   * @param animeListQueryParams Parameters for generating a request.
   */
  public fetchAnimeList(animeListQueryParams: AnimeListQueryParams): Observable<Pagination<AnimeBase>> {
    const animeListSearchParams = this.animeListOptionsMapper.toDto(animeListQueryParams);
    const params = new HttpParams({
      fromString: animeListSearchParams.toString(),
    });

    return this.http.get<PaginationDto<AnimeBaseDto>>(
      this.animeListUrl.toString(),
      { params },
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

  /**
   * Fetches anime by id.
   * @param id Anime id.
   */
  public fetchAnimeEditor(id: number): Observable<AnimeEditor> {
    const animeUrl = new URL(`${id}/`, this.animeListUrl);
    return this.http.get<AnimeEditorDto>(animeUrl.toString()).pipe(
      map(animeDetailsDto => AnimeMapper.fromEditorDto(animeDetailsDto)),
    );
  }

  /**
   * Creates anime.
   * @param animeData The anime object to be created.
   */
  public saveAnime({ id, aired, posterUrl, information }: AnimeData): Observable<number> {
    const anime: PostAnime | PutAnime = posterUrl !== null && posterUrl !== '' ?
      { ...information, aired, image: posterUrl, id } :
      { ...information, aired, image: null, id };

    if (this.isPutAnime(anime)) {
      const animePutUrl = new URL(`${id}/`, this.animeListUrl);
      const putAnimeDto = AnimeMapper.toPutEditorDto(anime);
      return this.http.put<AnimeEditorDto>(animePutUrl.toString(), putAnimeDto).pipe(
        map(animeEditorDto => animeEditorDto.id),
      );
    }

    const animeDto = AnimeMapper.toPostEditorDto(anime);
    return this.http.post<AnimeEditorDto>(this.animeListUrl.toString(), animeDto).pipe(
      map(animeEditorDto => animeEditorDto.id),
    );

  }

  /**
   * Saves file to s3.
   * @param file Poster file.
   */
  public savePoster(file: File | null): Observable<string | null> {
    if (file === null) {
      return of(null);
    }
    return this.s3directService.uploadAnimePoster(file, file.name);
  }

  /**
   * Deletes anime.
   * @param id ID anime.
   */
  public deleteAnime(id: number): Observable<void> {
    const animeDeleteUrl = new URL(`${id}/`, this.animeListUrl);
    return this.http.delete(animeDeleteUrl.toString()).pipe(
      untilDestroyed(this),
      map(() => void 0),
    );
  }

  /** Gets all anime types. */
  // eslint-disable-next-line require-await
  public async getAnimeTypes(): Promise<AnimeType[]> {
    return Object.values(AnimeType);
  }

  /** Gets all anime statuses. */
  // eslint-disable-next-line require-await
  public async getAnimeStatus(): Promise<AnimeStatus[]> {
    return Object.values(AnimeStatus);
  }

  /** Gets all anime season. */
  // eslint-disable-next-line require-await
  public async getSeason(): Promise<Season[]> {
    return Object.values(Season);
  }

  /** Gets all anime rating. */
  // eslint-disable-next-line require-await
  public async getRating(): Promise<Rating[]> {
    return Object.values(Rating);
  }

  /** Gets all anime source. */
  // eslint-disable-next-line require-await
  public async getSource(): Promise<Source[]> {
    return Object.values(Source);
  }

  private isPutAnime(anime: PostAnime | PutAnime): anime is PutAnime {
    return (anime as PutAnime).id !== undefined;
  }

}
