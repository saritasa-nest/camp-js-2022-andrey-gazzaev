import { HttpError } from '@js-camp/core/models/httpError';

import { Page } from '../constants/classes';
import { LocalStorageKeys } from '../constants/localStorage';
import { DEFAULT_LIMIT, START_OFFSET } from '../constants/public';
import { DEFAULT_SORT_SETTINGS } from '../constants/sort';
import { fetchAnime } from '../fetches/anime';
import { SortSettings } from '../types/sortSettings';

import { getLocalStorage } from './localStorage';
import { fillPaginationAnime } from './pagination';
import { fillTableAnime } from './table';

/**
 * Creates a URL address to get the page with the anime, taking into account the offset.
 * @param offset Offset relative to which you want to get records.
 * @param sort Sort Options.
 * @returns Ready url.
 */
export function getUrlAnime(offset: number, sort: SortSettings): string {
  const urlParts = [
    'anime/anime/?',
    `offset=${offset}&`,
    `limit=${DEFAULT_LIMIT}&`,
    `ordering=${sort.direction}${sort.ordering}&`,
    `status=${sort.status}&`,
  ];

  return urlParts.join('');
}

/** Jump to the top of the page. */
function goToTop(): void {
  const TOP_OF_PAGE = 0;
  const SCROLL_EVENT = 'smooth';

  window.scrollTo({
    top: TOP_OF_PAGE,
    behavior: SCROLL_EVENT,
  });
}

/** Render message about error. */
function renderError(): void {
  const pageContainer = document.querySelector(`.${Page.CONTAINER}`);
  if (pageContainer !== null) {
    const errorTemplate = document.createElement('p');
    errorTemplate.classList.add(Page.ERROR);

    const ERROR_MESSAGE = 'Ooops... Something went wrong';
    errorTemplate.innerHTML = ERROR_MESSAGE;

    pageContainer.innerHTML = '';
    pageContainer.append(errorTemplate);
  }
}

/**
 * Changes anime and pagination data relative to the current page.
 * @param currentPageNumber The page on which the change occurs.
 */
export async function changeAnimeData(currentPageNumber: number): Promise<void> {
  const localSortSettings = getLocalStorage<SortSettings>(LocalStorageKeys.SORT_SETTINGS);
  const currentOffset = currentPageNumber * START_OFFSET;
  const urlGetAnime = localSortSettings !== null ?
    getUrlAnime(currentOffset, localSortSettings) :
    getUrlAnime(currentOffset, DEFAULT_SORT_SETTINGS);

  const animeResponse = await fetchAnime(urlGetAnime);

  if (animeResponse instanceof HttpError || animeResponse instanceof Error) {
    return renderError();
  }

  const anime = animeResponse.results;
  fillTableAnime(anime);

  goToTop();

  const allAnimeCount = animeResponse.count;
  fillPaginationAnime(allAnimeCount, currentPageNumber);
}
