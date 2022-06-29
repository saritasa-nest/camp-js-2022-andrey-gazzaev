import { AnimeFetchHeaders } from '../constants/anime';
import { API_KEY } from '../constants/public';
import { IAnimeResponse } from '../types/anime';

/**
 * Request to the server to get anime.
 * @param url Request address.
 * @returns Server response.
 */
export const fetchGetAnime = async(url: string): Promise<IAnimeResponse> => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        [AnimeFetchHeaders.ApiKey]: API_KEY,
      },
    });

    const animeResponse: IAnimeResponse = await res.json();

    return animeResponse;
  } catch {
    const errorResponse: IAnimeResponse = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
    return errorResponse;
  }
};
