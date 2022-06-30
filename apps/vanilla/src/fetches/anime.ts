import { IAnimeResponseDTO } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { AnimeResponse } from '@js-camp/core/models/anime';

import { AnimeFetchHeaders } from '../constants/anime';
import { API_KEY } from '../constants/public';

/**
 * Request to the server to get anime.
 * @param url Request address.
 * @returns Server response.
 */
export const fetchGetAnime = async(url: string): Promise<AnimeResponse> => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        [AnimeFetchHeaders.ApiKey]: API_KEY,
      },
    });

    const animeResponseDto: IAnimeResponseDTO = await res.json();
    const animeResponse = AnimeMapper.fromDto(animeResponseDto);
    return animeResponse;
  } catch {
    return new AnimeResponse({
      count: 0,
      next: null,
      previous: null,
      results: [],
    });
  }
};
