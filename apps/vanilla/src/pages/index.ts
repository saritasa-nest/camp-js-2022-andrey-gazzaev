import { LocalStorageKey } from '../constants/localStorage';
import { DEFAULT_PAGINATION_SETTINGS } from '../constants/pagination';
import { getValueFromLocalStorage, setValueToLocalStorage } from '../services/domain/localStorage';
import { initSortElements } from '../UI/tableView/sort';
import { PaginationOptions } from '../types/paginationSettings';
import { handleChangeAnimeData } from '../UI/tableView/general';

const FIRST_PAGE_NUMBER = 1;

/** Adds sorting settings to local storage if they are not there. */
function initSortSettings(): void {
  if (getValueFromLocalStorage<PaginationOptions>(LocalStorageKey.PAGINATION_SETTINGS) === null) {
    setValueToLocalStorage<PaginationOptions>(LocalStorageKey.PAGINATION_SETTINGS, DEFAULT_PAGINATION_SETTINGS);
  }
}

/** Table initialization and pagination. */
function initTable(): void {
  initSortSettings();
  initSortElements();
  handleChangeAnimeData(FIRST_PAGE_NUMBER);
}

window.addEventListener('DOMContentLoaded', initTable);
