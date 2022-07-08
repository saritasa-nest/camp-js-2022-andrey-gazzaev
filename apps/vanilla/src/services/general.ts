import { User } from '@js-camp/core/models/user';

import { LocalStorageKey } from '../constants/localStorage';
import { Pagination } from '../constants/pagination';
import { DEFAULT_SORT_SETTINGS } from '../constants/sort';
import { AnimeData } from '../types/anime';
import { SortSettings } from '../types/sortSettings';

import { fetchAnime } from './api/anime';
import { isTokenValid } from './api/auth';
import { fetchUserProfile } from './api/user';
import { TokenService } from './domain/token';
import { getValueFromLocalStorage, setValueToLocalStorage } from './domain/localStorage';

/** Checks if the user is logged in. */
async function isAuthorized(): Promise<boolean> {
  const tokens = TokenService.getTokens();
  if (tokens !== null) {
    try {
      if (await isTokenValid(tokens.access)) {
        return true;
      }

      return true;
    } catch (error: unknown) {
      return false;
    }
  }
  return false;
}

/** Gets user information.*/
export async function getUser(): Promise<User | null> {
  if (await isAuthorized()) {
    return fetchUserProfile();
  }
  return null;
}

/**
 * Creates a URL address to get the page with the anime, taking into account the offset.
 * @param offset Offset relative to which you want to get records.
 * @param sort Sort Options.
 * @returns Ready url.
 */
function getUrlAnime(offset: number, sort: SortSettings): string {
  const offsetParam = ['offset', String(offset)];
  const limitParam = ['limit', String(Pagination.DEFAULT_LIMIT)];
  const orderingParam = ['ordering', `${sort.direction}${sort.ordering}`];
  const statusParam = ['status', sort.status];

  const params = [offsetParam, limitParam, orderingParam, statusParam];
  const searchParams = new URLSearchParams(params);

  return `anime/anime/?${searchParams.toString()}`;
}

/**
 * Changes anime and pagination data relative to the current page.
 * @param currentPageNumber The page on which the change occurs.
 */
export async function changeAnimeData(currentPageNumber: number): Promise<AnimeData | null> {
  const localSortSettings = getValueFromLocalStorage<SortSettings>(LocalStorageKey.SORT_SETTINGS);
  const currentOffset = currentPageNumber * Pagination.DEFAULT_LIMIT;
  const urlGetAnime = localSortSettings !== null ?
    getUrlAnime(currentOffset, localSortSettings) :
    getUrlAnime(currentOffset, DEFAULT_SORT_SETTINGS);

  try {
    const { results: animeList, count: totalAnimeCount } = await fetchAnime(urlGetAnime);

    return { animeList, totalAnimeCount, currentPageNumber };
  } catch (error: unknown) {
    setValueToLocalStorage(LocalStorageKey.SORT_SETTINGS, null);

    return null;
  }
}
