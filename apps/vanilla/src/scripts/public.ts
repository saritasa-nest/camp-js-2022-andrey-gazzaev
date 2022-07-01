import { DEFAULT_OFFSET } from '../constants/public';
import { LOCAL_STORAGE_SETTINGS } from '../constants/sort';
import { fetchGetAnime } from '../fetches/anime';
import { SortSettings } from '../types/sortSettings';

import { fillPaginationAnime } from './pagination';
import { fillTableAnime } from './table';

/**
 * Get sort settings from local storage.
 * @returns If there are no settings, then null otherwise the settings object.
 */
export function getLocalSortSettings(): SortSettings | null {
  const localStorageSettings = localStorage.getItem(LOCAL_STORAGE_SETTINGS);
  if (localStorageSettings !== null) {
    const sortSettings: SortSettings = JSON.parse(localStorageSettings);
    return sortSettings;
  }
  return null;
}

/**
 * Write sort settings to local storage.
 * @param sortSettings Selected sort values.
 */
export function setLocalSortSettings(sortSettings: SortSettings): void {
  localStorage.setItem(LOCAL_STORAGE_SETTINGS, JSON.stringify(sortSettings));
}

/**
 * Creating a URL address to get the page with the anime, taking into account the offset.
 * @param offset Offset relative to which you want to get records.
 * @param ordering Field for ordering elements.
 * @param status Anime status.
 * @param direction Sorting in descending and ascending order.
 * @returns Ready url.
 */
export function getUrlAnime(offset: number, ordering = 'id', status = 'AIRING', direction = ''): string {
  const urlParts = [
    'https://api.camp-js.saritasa.rocks/api/v1/anime/anime/?',
    `offset=${offset}&`,
    'limit=25&',
    `ordering=${direction}${ordering}&`,
    `status=${status}&`,
  ];

  return urlParts.join('');
}

/**
 * Jump to the top of the page.
 */
function goToTop(): void {
  // For Safari.
  document.body.scrollTop = 0;

  // For Chrome, Firefox, IE and Opera.
  document.documentElement.scrollTop = 0;
}

/**
 * Сhang anime and pagination data relative to the current page.
 * @param currentPage The page on which the change occurs.
 */
export async function changeAnimeData(currentPage: number): Promise<void> {
  const localSortSettings = getLocalSortSettings();
  let urlGetAnime = '';
  if (localSortSettings !== null) {
    // localSortSettings non-iterable object
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
}
