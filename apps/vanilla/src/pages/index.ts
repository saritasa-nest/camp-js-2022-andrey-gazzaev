import { renderHeader } from '../UI/header/header';
import { initSortElements } from '../UI/tableView/sort';
import { handleChangeAnimeData } from '../UI/tableView/general';
import { DEFAULT_PAGINATION_SETTINGS, FIRST_PAGE_NUMBER } from '../constants/pagination';
import { QueryParamsService } from '../services/domain/queryParams';

/** Adds sorting settings to local storage if they are not there. */
function initSortSettings(): void {
  if (QueryParamsService.getPaginationParams() === null) {
    QueryParamsService.setPaginationParams(DEFAULT_PAGINATION_SETTINGS);
  }
}

/** Initialization home page. */
function initHomePage(): void {
  renderHeader();

  initSortSettings();
  initSortElements();

  handleChangeAnimeData(FIRST_PAGE_NUMBER);
}

window.addEventListener('DOMContentLoaded', initHomePage);
