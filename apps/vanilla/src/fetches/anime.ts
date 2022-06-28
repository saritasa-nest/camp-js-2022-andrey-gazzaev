import { API_KEY } from '../constants/public';
import { IAnimeResponse } from '../types/anime';

export const fetchGetAnime = async (url: string): Promise<IAnimeResponse> => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Api-Key': API_KEY,
      },
    });

    const animeResponse: IAnimeResponse = await res.json();

    return animeResponse;
  } catch (error) {
    const fetchError = 'fetch anime error';
    console.warn(fetchError);
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }
};
