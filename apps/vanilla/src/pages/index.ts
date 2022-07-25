import { isDefined } from '@js-camp/core/utils/guards/general.guard';

import { renderHeader } from '../UI/header/header';
import { initSortElements } from '../UI/tableView/sort';
import { handleAnimePageChange } from '../UI/tableView/general';
import { DEFAULT_PAGINATION_SETTINGS } from '../constants/pagination';
import { QueryParamsService } from '../services/domain/queryParams';
import { PaginationService } from '../services/domain/pagination';

/** Adds sorting settings to local storage if they are not there. */
function initSortSettings(): void {
  if (!isDefined(QueryParamsService.getPaginationParams())) {
    QueryParamsService.setPaginationParams(DEFAULT_PAGINATION_SETTINGS);
  }
}

/** Initialization home page. */
function initHomePage(): void {
  renderHeader();

  initSortSettings();
  initSortElements();

  const currentPage = PaginationService.getCurrentPage();
  handleAnimePageChange(currentPage);
}

window.addEventListener('DOMContentLoaded', initHomePage);
window.addEventListener('popstate', () => window.history.go());
