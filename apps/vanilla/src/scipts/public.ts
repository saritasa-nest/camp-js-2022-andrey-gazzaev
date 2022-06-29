import { DEFAULT_OFFSET } from '../constants/anime';
import { fetchGetAnime } from '../fetches/anime';

import { fillPaginationAnime } from './pagination';
import { fillTableAnime } from './table';

/**
 * Creating a URL address to get the page with the anime, taking into account the offset.
 * @param offset Offset relative to which you want to get records.
 * @returns Ready url.
 */
export const getUrlAnime = (offset: number): string => `https://api.camp-js.saritasa.rocks/api/v1/anime/anime/?offset=${offset}&limit=25`;

/**
 * Jump to the top of the page.
 */
const goToTop = (): void => {
  // For Safari.
  document.body.scrollTop = 0;

  // For Chrome, Firefox, IE and Opera.
  document.documentElement.scrollTop = 0;

};

/**
 * Сhanging anime and pagination data relative to the current page.
 * @param currentPage The page on which the change occurs.
 */
export const changeAnimeData = async(currentPage: number): Promise<void> => {
  const urlGetAnime = getUrlAnime(currentPage * DEFAULT_OFFSET);
  const animeResponse = await fetchGetAnime(urlGetAnime);
  const anime = animeResponse.results;
  fillTableAnime(anime);

  goToTop();

  const allAnimeCount = animeResponse.count;
  return fillPaginationAnime(allAnimeCount, currentPage);
};
