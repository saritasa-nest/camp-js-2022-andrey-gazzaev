import { LocalStorageKey } from '../constants/localStorage';
import { AnimeData } from '../types/anime';
import { QueryOptions } from '../types/animeSettings';

import { fetchAnime } from './api/anime';
import { LocalStorageService } from './domain/localStorage';

/**
 * Creates a URL address to get the page with the anime, taking into account the offset.
 * @param offset Offset relative to which you want to get records.
 * @param animeOptions Anime Options.
 * @returns Ready url.
 */
function getUrlAnime(offset: number, animeOptions: QueryOptions): string {
  const offsetParam = ['offset', String(offset)];
  const limitParam = ['limit', String(animeOptions.limit)];
  const orderingParam = ['ordering', `${animeOptions.sort.ordering}${animeOptions.sort.field}`];
  const statusParam = ['status', animeOptions.filter.byStatusField];
  const searchParam = ['search', animeOptions.search];

  const params = [offsetParam, limitParam, orderingParam, statusParam, searchParam];

  const searchParams = new URLSearchParams(params);

  return `anime/anime/?${searchParams.toString()}`;
}

/**
 * Changes anime and pagination data relative to the current page.
 * @param currentPageNumber The page on which the change occurs.
 */
export async function changeAnimeData(currentPageNumber: number): Promise<AnimeData | null> {
  const localPaginationOptions = LocalStorageService.getValue<QueryOptions>(LocalStorageKey.ANIME_SETTINGS);
  if (localPaginationOptions === null) {
    return null;
  }

  const currentOffset = currentPageNumber * localPaginationOptions.limit;

  const urlGetAnime = getUrlAnime(currentOffset, localPaginationOptions);

  try {
    const { results: list, count: totalCount } = await fetchAnime(urlGetAnime);

    return { list, totalCount, currentPageNumber, limit: localPaginationOptions.limit };
  } catch (error: unknown) {
    LocalStorageService.setValue(LocalStorageKey.ANIME_SETTINGS, null);
    return null;
  }
}
