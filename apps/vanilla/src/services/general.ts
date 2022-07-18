import { isNotFalsy } from '@js-camp/core/utils/guards/general.guard';
import { User } from '@js-camp/core/models/user';

import { DEFAULT_PAGINATION_SETTINGS, FIRST_PAGE_NUMBER } from '../constants/pagination';
import { AnimeData } from '../types/anime';
import { PaginationOptions } from '../types/paginationSettings';

import { fetchAnime } from './api/anime';
import { isTokenValid } from './api/auth';
import { fetchUserProfile } from './api/user';
import { TokenService } from './domain/token';
import { QueryParamsService } from './domain/queryParams';

/** Checks if the user is logged in. */
async function isAuthorized(): Promise<boolean> {
  const tokens = TokenService.getTokens();
  if (isNotFalsy(tokens)) {
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
 * @param paginationOptions Pagination Options.
 * @returns Ready url.
 */
function getUrlAnime(paginationOptions: PaginationOptions): string {
  const params = QueryParamsService.paginationOptionsToUrlSearchParams(paginationOptions);
  if (isNotFalsy(params)) {
    return `anime/anime/?${params.toString()}`;
  }
  return `anime/anime/`;
}

/**
 * Changes anime and pagination data relative to the current page.
 * @param currentPageNumber The page on which the change occurs.
 */
export async function changeAnimeData(currentPageNumber: number): Promise<AnimeData | null> {
  const paginationOptions = QueryParamsService.getPaginationParams();

  if (!isNotFalsy(paginationOptions)) {
    return null;
  }

  const currentOffset = currentPageNumber === FIRST_PAGE_NUMBER ? 0 : currentPageNumber * paginationOptions.limit;

  const newPaginationOptions: PaginationOptions = { ...paginationOptions, offset: currentOffset };
  QueryParamsService.setPaginationParams(newPaginationOptions);

  const urlGetAnime = getUrlAnime(newPaginationOptions);

  try {
    const { results: list, count: totalCount } = await fetchAnime(urlGetAnime);

    return { list, totalCount, currentPageNumber, limit: paginationOptions.limit };
  } catch (error: unknown) {
    QueryParamsService.setPaginationParams(DEFAULT_PAGINATION_SETTINGS);

    return null;
  }
}
