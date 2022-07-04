import axios from 'axios';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { FetchHeaders } from '../constants/fetch';

/**
 * Request to the server to get anime.
 * @param url Request address.
 */
export async function fetchAnime(url: string): Promise<Pagination<Anime>> {
  try {
    const instance = await axios.get<PaginationDto<AnimeDto>>(url, {
      baseURL: import.meta.env.VITE_BASE_URL,
      headers: {
        [FetchHeaders.ApiKey]: import.meta.env.VITE_API_KEY,
      },
    });

    const animeResponseDto = instance.data;

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
