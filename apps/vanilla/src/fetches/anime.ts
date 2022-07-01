import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import axios from 'axios';

import { FetchHeaders } from '../constants/fetch';

/**
 * Request to the server to get anime.
 * @param url Request address.
 * @returns Server response.
 */
export async function fetchGetAnime(url: string): Promise<Pagination<Anime>> {
  try {
    const instance = axios.get(url, {
      headers: {
        [FetchHeaders.ApiKey]: ENV.apiKey,
      },
    });

    const animeResponseDto: PaginationDto<AnimeDto> = (await instance).data;

    return AnimeMapper.fromDto(animeResponseDto);
  } catch {
    return new Pagination<Anime>({
      count: 0,
      next: '',
      previous: '',
      results: [],
    });
  }
}
