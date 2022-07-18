import { Page } from '../../constants/classes';
import { PaginationService } from '../../services/domain/pagination';
import { changeAnimeData } from '../../services/general';
import { AnimeData } from '../../types/anime';

import { fillPaginationAnime } from './pagination';
import { fillTableAnime } from './table';

/**
 * Handles the anime data change event.
 * @param currentPageNumber The page on which the change occurs.
 */
export async function handleChangeAnimeData(currentPageNumber: number): Promise<void> {
  const animeData = await changeAnimeData(currentPageNumber);
  if (animeData !== null) {
    return renderTableView(animeData);
  }
  return renderTableViewError();
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

/**
 * Renders UI component related to table view.
 * @param tableViewData Data about table view.
 */
export function renderTableView({ list, totalCount, currentPageNumber, limit }: AnimeData): void {
  goToTop();
  fillTableAnime(list);

  const paginationBorders = PaginationService.definePaginationBoundaries(
    totalCount,
    currentPageNumber,
    limit,
  );
  fillPaginationAnime({ borders: paginationBorders, currentPage: currentPageNumber });
}

/** Renders message about table view error. */
export function renderTableViewError(): void {
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
