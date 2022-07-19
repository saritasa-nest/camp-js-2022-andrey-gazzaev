import { isDefine } from '@js-camp/core/utils/guards/general.guard';

import { renderHeader } from '../UI/header/header';
import { initSortElements } from '../UI/tableView/sort';
import { handleChangeAnimePage } from '../UI/tableView/general';
import { DEFAULT_PAGINATION_SETTINGS, FIRST_PAGE_NUMBER } from '../constants/pagination';
import { QueryParamsService } from '../services/domain/queryParams';

/** Adds sorting settings to local storage if they are not there. */
function initSortSettings(): void {
  if (!isDefine(QueryParamsService.getPaginationParams())) {
    QueryParamsService.setPaginationParams(DEFAULT_PAGINATION_SETTINGS);
  }
}

/** Initialization home page. */
function initHomePage(): void {
  renderHeader();

  initSortSettings();
  initSortElements();

  // TO DO add this domain layer
  const paginationOptions = QueryParamsService.getPaginationParams();

  if (!isDefine(paginationOptions)) {
    handleChangeAnimePage(FIRST_PAGE_NUMBER);
    return;
  }

  const currentPage = paginationOptions.offset === 0 ? FIRST_PAGE_NUMBER : paginationOptions.offset / paginationOptions.limit;
  handleChangeAnimePage(currentPage);
}

window.addEventListener('DOMContentLoaded', initHomePage);
window.addEventListener('popstate', () => window.history.go());
