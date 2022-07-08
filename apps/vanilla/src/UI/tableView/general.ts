import { Anime } from '@js-camp/core/models/anime';
import { DateRange } from '@js-camp/core/models/dateRange';

import { Page } from '../../constants/classes';

import { fillPaginationAnime } from './pagination';
import { fillTableAnime } from './table';

/** Necessary data for building a table view. */
interface TableViewData {

  /** List of anime contained in the table. */
  readonly animeList: readonly Anime<DateRange>[];

  /** The total number of anime on which the pagination is based. */
  readonly totalAnimeCount: number;

  /** The current page on which pagination is based. */
  readonly currentPageNumber: number;
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
export function renderTableView({ animeList, totalAnimeCount, currentPageNumber }: TableViewData): void {
  goToTop();
  fillTableAnime(animeList);
  fillPaginationAnime(totalAnimeCount, currentPageNumber);
}
