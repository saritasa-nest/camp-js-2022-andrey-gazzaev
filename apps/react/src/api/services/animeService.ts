import { AnimeBaseDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeListOptionsMapper } from '@js-camp/core/mappers/anime-list-options.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeBase } from '@js-camp/core/models/anime';
import { AnimeListQueryParams } from '@js-camp/core/models/anime-list-query-params';

import { http } from '..';
import { CONFIG } from '../config';

export namespace AnimeService {
  const animeListUrl = new URL('anime/anime/', CONFIG.apiUrl);
  let animeListNextUrl: URL | null = null;

  /**
   * Requests to the server to get anime.
   * @param animeListQueryParams Parameters for generating a request.
   */
  export async function fetchAnimeList(animeListQueryParams: AnimeListQueryParams): Promise<readonly AnimeBase[]> {
    const animeListSearchParams = AnimeListOptionsMapper.toDto(animeListQueryParams);
    const { data } = await http.get<PaginationDto<AnimeBaseDto>>(animeListUrl.toString(), {
      params: animeListSearchParams,
    });
    const animeList = PaginationMapper.fromDto(
      data,
      animeBaseDto => AnimeMapper.fromDto(animeBaseDto),
    );

    setAnimeListNextUrl(animeList.next);

    return animeList.results;
  }

  /** Fetches next anime list. */
  export async function fetchNextAnimeList(): Promise<readonly AnimeBase[] | null> {
    if (animeListNextUrl === null) {
      return null;
    }

    const { data } = await http.get<PaginationDto<AnimeBaseDto>>(animeListNextUrl.toString());
    const animeList = PaginationMapper.fromDto(
      data,
      animeBaseDto => AnimeMapper.fromDto(animeBaseDto),
    );

    setAnimeListNextUrl(animeList.next);

    return animeList.results;
  }

  /**
   * Sets next URL.
   * @param url Some URL.
   */
  function setAnimeListNextUrl(url: string | null) {
    animeListNextUrl = url !== null ? new URL(url) : null;
  }
}
