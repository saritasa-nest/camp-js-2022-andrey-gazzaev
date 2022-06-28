import { DEFAULT_OFFSET } from '../constants/anime';
import { fetchGetAnime } from '../fetches/anime';
import { fillPaginationAnime } from './pagination';
import { fillTableAnime } from './tableAnime';

/**
 * Creating a URL address to get the page with the anime, taking into account the offset.
 * @param offset offset relative to which you want to get records.
 * @returns Ready url.
 */
export const getUrlAnime = (offset: number) => {
  return `https://api.camp-js.saritasa.rocks/api/v1/anime/anime/?offset=${offset}&limit=25`;
};

/**
 * Сhanging anime and pagination data relative to the current page.
 * @param currentPage The page on which the change occurs.
 */
export const changeAnimeData = async (currentPage: number) => {
  const urlGetAnime = getUrlAnime(currentPage * DEFAULT_OFFSET);
  const animeResponse = await fetchGetAnime(urlGetAnime);
  const anime = animeResponse.results;
  fillTableAnime(anime);

  const allAnimeCount = animeResponse.count;
  fillPaginationAnime(allAnimeCount, currentPage);
};
