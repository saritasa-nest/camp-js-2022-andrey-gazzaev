import { map, Observable, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { DateRange } from '@js-camp/core/models/dateRange';
import { AnimeBaseDto } from '@js-camp/core/dtos/anime.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { PosterData } from '@js-camp/core/models/poster-data';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { AnimeDetails } from '@js-camp/core/models/animeDetails';
import { AnimeDetailsDto } from '@js-camp/core/dtos/animeDetails';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeEditorDto } from '@js-camp/core/dtos/anime-editor.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeBase, AnimeStatus, AnimeType } from '@js-camp/core/models/anime';
import { AnimeEditor, AnimeInformation, Rating, Season, Source } from '@js-camp/core/models/anime-editor';

import { AnimeListQueryParams } from '../models/anime-list-query-params';

import { AppConfigService } from './app-config.service';
import { AnimeListOptionsMapper } from './mappers/anime-list-options.mapper';
import { S3directService } from './s3direct.service';

interface PostAnimeData {

  /** Information about anime. */
  readonly information: AnimeInformation;

  /** Anime poster. */
  readonly posterData: PosterData;

  /** Aired date range. */
  readonly aired: DateRange;
}

interface PutAnimeData extends PostAnimeData {

  /** ID. */
  readonly id: number;
}

/** Anime service. */
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
  public createAnime({ aired, posterData, information }: PostAnimeData): Observable<number> {
    if (posterData.file !== null && posterData.fileName !== null) {
      return this.s3directService.uploadAnimePoster(posterData.file, posterData.fileName).pipe(
        map(posterUrl => AnimeMapper.toPostEditorDto({ ...information, aired, image: posterUrl })),
        switchMap(postAnimeDto => this.http.post<AnimeEditorDto>(this.animeListUrl.toString(), postAnimeDto)),
        map(animeEditorDto => animeEditorDto.id),
      );
    } else if (posterData.url !== null) {
      const animeDto = AnimeMapper.toPostEditorDto({ ...information, aired, image: posterData.url });
      return this.http.post<AnimeEditorDto>(this.animeListUrl.toString(), animeDto).pipe(
        map(animeEditorDto => animeEditorDto.id),
      );
    }

    return of(-1);
  }

  /**
   * Updates anime.
   * @param animeData The anime object to be updated.
   */
  public updateAnime({ id, aired, posterData, information }: PutAnimeData): Observable<number> {
    const animePutUrl = new URL(`${id}/`, this.animeListUrl);

    if (posterData.file !== null && posterData.fileName !== null) {
      return this.s3directService.uploadAnimePoster(posterData.file, posterData.fileName).pipe(
        map(posterUrl => AnimeMapper.toPutEditorDto({ ...information, aired, image: posterUrl, id: 1 })),
        switchMap(putAnimeDto => this.http.put<AnimeEditorDto>(animePutUrl.toString(), putAnimeDto)),
        map(animeEditorDto => animeEditorDto.id),
      );
    } else if (posterData.url !== null) {
      const animeDto = AnimeMapper.toPostEditorDto({ ...information, aired, image: posterData.url });
      return this.http.put<AnimeEditorDto>(animePutUrl.toString(), animeDto).pipe(
        map(animeEditorDto => animeEditorDto.id),
      );
    }

    return of(-1);
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

}
