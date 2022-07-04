import { DEFAULT_OFFSET } from '../constants/public';
import { DEFAULT_SORT_SETTINGS, LOCAL_SORT_SETTINGS } from '../constants/sort';
import { fetchAnime } from '../fetches/anime';
import { SortSettings } from '../types/sortSettings';

import { fillPaginationAnime } from './pagination';
import { fillTableAnime } from './table';

/**
 * Get sort settings from local storage.
 * @returns If there are no settings, then null otherwise the settings object.
 */
export function getLocalSortSettings(): SortSettings | null {
  const localStorageSettings = localStorage.getItem(LOCAL_SORT_SETTINGS);
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
  localStorage.setItem(LOCAL_SORT_SETTINGS, JSON.stringify(sortSettings));
}

/**
 * Creates a URL address to get the page with the anime, taking into account the offset.
 * @param offset Offset relative to which you want to get records.
 * @param sort Sort Options.
 * @returns Ready url.
 */
export function getUrlAnime(offset: number, sort: SortSettings): string {
  const urlParts = [
    'https://api.camp-js.saritasa.rocks/api/v1/anime/anime/?',
    `offset=${offset}&`,
    'limit=25&',
    `ordering=${sort.direction}${sort.ordering}&`,
    `status=${sort.status}&`,
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
 * Сhanges anime and pagination data relative to the current page.
 * @param currentPageNumber The page on which the change occurs.
 */
export async function changeAnimeData(currentPageNumber: number): Promise<void> {
  const localSortSettings = getLocalSortSettings();
  const urlGetAnime = localSortSettings !== null ?
    getUrlAnime(currentPageNumber * DEFAULT_OFFSET, localSortSettings) :
    getUrlAnime(currentPageNumber * DEFAULT_OFFSET, DEFAULT_SORT_SETTINGS);

  const animeResponse = await fetchAnime(urlGetAnime);
  const anime = animeResponse.results;
  fillTableAnime(anime);

  goToTop();

  const allAnimeCount = animeResponse.count;
  return fillPaginationAnime(allAnimeCount, currentPageNumber);
}
