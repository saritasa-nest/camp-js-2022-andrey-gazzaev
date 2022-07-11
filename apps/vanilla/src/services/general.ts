import { LocalStorageKey } from '../constants/localStorage';
import { AnimeData } from '../types/anime';
import { PaginationOptions } from '../types/paginationSettings';

import { fetchAnime } from './api/anime';
import { LocalStorageService } from './domain/localStorage';

/**
 * Creates a URL address to get the page with the anime, taking into account the offset.
 * @param offset Offset relative to which you want to get records.
 * @param paginationOptions  Options.
 * @returns Ready url.
 */
function getUrlAnime(offset: number, paginationOptions: PaginationOptions): string {
  const offsetParam = ['offset', String(offset)];
  const limitParam = ['limit', String(paginationOptions.limit)];
  const orderingParam = ['ordering', `${paginationOptions.sort.ordering}${paginationOptions.sort.field}`];
  const statusParam = ['status', paginationOptions.filter.byStatusField];

  const params = [offsetParam, limitParam, orderingParam, statusParam];
  const searchParams = new URLSearchParams(params);

  return `anime/anime/?${searchParams.toString()}`;
}

/**
 * Changes anime and pagination data relative to the current page.
 * @param currentPageNumber The page on which the change occurs.
 */
export async function changeAnimeData(currentPageNumber: number): Promise<AnimeData | null> {
  const localPaginationOptions = LocalStorageService.getValueFromLocalStorage<PaginationOptions>(LocalStorageKey.PAGINATION_SETTINGS);
  if (localPaginationOptions === null) {
    return null;
  }

  const currentOffset = currentPageNumber * localPaginationOptions.limit;

  const urlGetAnime = getUrlAnime(currentOffset, localPaginationOptions);

  try {
    const { results: list, count: totalCount } = await fetchAnime(urlGetAnime);

    return { list, totalCount, currentPageNumber, limit: localPaginationOptions.limit };
  } catch (error: unknown) {
    LocalStorageService.setValueToLocalStorage(LocalStorageKey.PAGINATION_SETTINGS, null);
    return null;
  }
}
