import { HttpError } from '@js-camp/core/models/httpError';

import { renderTableView, renderTableViewError } from '../UI/tableView/general';
import { LocalStorageKey } from '../constants/localStorage';
import { Pagination } from '../constants/pagination';
import { DEFAULT_SORT_SETTINGS } from '../constants/sort';
import { SortSettings } from '../types/sortSettings';

import { fetchAnime } from './api/anime';
import { getValueFromLocalStorage } from './domain/localStorage';

/**
 * Creates a URL address to get the page with the anime, taking into account the offset.
 * @param offset Offset relative to which you want to get records.
 * @param sort Sort Options.
 * @returns Ready url.
 */
function getUrlAnime(offset: number, sort: SortSettings): string {
  const urlParts = [
    'anime/anime/?',
    `offset=${offset}&`,
    `limit=${Pagination.DEFAULT_LIMIT}&`,
    `ordering=${sort.direction}${sort.ordering}&`,
    `status=${sort.status}&`,
  ];

  return urlParts.join('');
}

/**
 * Changes anime and pagination data relative to the current page.
 * @param currentPageNumber The page on which the change occurs.
 */
export async function changeAnimeData(currentPageNumber: number): Promise<void> {
  const localSortSettings = getValueFromLocalStorage<SortSettings>(LocalStorageKey.SORT_SETTINGS);
  const currentOffset = currentPageNumber * Pagination.START_OFFSET;
  const urlGetAnime = localSortSettings !== null ?
    getUrlAnime(currentOffset, localSortSettings) :
    getUrlAnime(currentOffset, DEFAULT_SORT_SETTINGS);

  try {
    const { results: animeList, count: totalAnimeCount } = await fetchAnime(urlGetAnime);

    renderTableView({ animeList, totalAnimeCount, currentPageNumber });

  } catch (error: unknown) {

    if (error instanceof HttpError || error instanceof Error) {
      return renderTableViewError();
    }
  }
}
