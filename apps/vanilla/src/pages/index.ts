import { isNotFalsy } from '@js-camp/core/utils/guards/general.guard';

import { renderHeader } from '../UI/header/header';
import { initSortElements } from '../UI/tableView/sort';
import { handleChangeAnimeData } from '../UI/tableView/general';
import { DEFAULT_PAGINATION_SETTINGS, FIRST_PAGE_NUMBER } from '../constants/pagination';
import { QueryParamsService } from '../services/domain/queryParams';

/** Adds sorting settings to local storage if they are not there. */
function initSortSettings(): void {
  if (!isNotFalsy(QueryParamsService.getPaginationParams())) {
    QueryParamsService.setPaginationParams(DEFAULT_PAGINATION_SETTINGS);
  }
}

/** Initialization home page. */
function initHomePage(): void {
  renderHeader();

  initSortSettings();
  initSortElements();
  const paginationOptions = QueryParamsService.getPaginationParams();

  if (!isNotFalsy(paginationOptions)) {
    handleChangeAnimeData(FIRST_PAGE_NUMBER);
    return;
  }

  const currentPage = paginationOptions.offset === 0 ? FIRST_PAGE_NUMBER : paginationOptions.offset / paginationOptions.limit;
  handleChangeAnimeData(currentPage);
}

window.addEventListener('DOMContentLoaded', initHomePage);
window.addEventListener('popstate', () => window.history.go());
