import { renderHeader } from '../UI/header/header';
import { LocalStorageKey } from '../constants/localStorage';
import { DEFAULT_PAGINATION_SETTINGS, FIRST_PAGE_NUMBER } from '../constants/pagination';
import { initSortElements } from '../UI/tableView/sort';
import { PaginationOptions } from '../types/paginationSettings';
import { handleChangeAnimeData } from '../UI/tableView/general';
import { LocalStorageService } from '../services/domain/localStorage';

/** Adds sorting settings to local storage if they are not there. */
function initSortSettings(): void {
  if (LocalStorageService.getValue<PaginationOptions>(LocalStorageKey.PAGINATION_SETTINGS) === null) {
    LocalStorageService.setValue<PaginationOptions>(
      LocalStorageKey.PAGINATION_SETTINGS,
      DEFAULT_PAGINATION_SETTINGS,
    );
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
