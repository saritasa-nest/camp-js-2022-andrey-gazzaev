import { DEFAULT_OFFSET, LOCAL_CURRENT_PAGE, LOCAL_STORAGE_SETTINGS } from '../constants/anime';
import { fetchGetAnime } from '../fetches/anime';
import { ISortSettings } from '../types/anime';

import { fillPaginationAnime } from './pagination';
import { fillTableAnime } from './table';

/**
 * Get sort settings from local storage.
 * @returns If there are no settings, then null otherwise the settings object.
 */
export const getLocalSortSettings = (): ISortSettings | null => {
  const localStorageSettings = localStorage.getItem(LOCAL_STORAGE_SETTINGS);
  if (localStorageSettings) {
    const sortSettings: ISortSettings = JSON.parse(localStorageSettings);
    return sortSettings;
  }
  return null;
};

/**
 * Write sort settings to local storage.
 * @param sortSettings Selected sort values.
 */
export const setLocalSortSettings = (sortSettings: ISortSettings): void => {
  localStorage.setItem(LOCAL_STORAGE_SETTINGS, JSON.stringify(sortSettings));
};

/**
 * Creating a URL address to get the page with the anime, taking into account the offset.
 * @param offset Offset relative to which you want to get records.
 * @param ordering Field for ordering elements.
 * @param status Anime status.
 * @param direction Sorting in descending and ascending order.
 * @returns Ready url.
 */
export const getUrlAnime = (offset: number, ordering = 'id', status = 'AIRING', direction = ''): string => {
  const urlParts = [
    'https://api.camp-js.saritasa.rocks/api/v1/anime/anime/?',
    `offset=${offset}&`,
    'limit=25&',
    `ordering=${direction}${ordering}&`,
    `status=${status}&`,
  ];

  return urlParts.join('');
};

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
  const localSortSettings = getLocalSortSettings();
  localStorage.setItem(LOCAL_CURRENT_PAGE, JSON.stringify(currentPage));
  let urlGetAnime = '';
  if (localSortSettings) {
    urlGetAnime = getUrlAnime(
      currentPage * DEFAULT_OFFSET,
      localSortSettings.ordering,
      localSortSettings.status,
      localSortSettings.direction,
    );
  } else {
    urlGetAnime = getUrlAnime(currentPage * DEFAULT_OFFSET);
  }
  const animeResponse = await fetchGetAnime(urlGetAnime);
  const anime = animeResponse.results;
  fillTableAnime(anime);

  goToTop();

  const allAnimeCount = animeResponse.count;
  return fillPaginationAnime(allAnimeCount, currentPage);
};
