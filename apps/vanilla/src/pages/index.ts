import { renderHeader } from '../UI/header/header';
import { LocalStorageKey } from '../constants/localStorage';
import { Pagination } from '../constants/pagination';
import { DEFAULT_SORT_SETTINGS } from '../constants/sort';
import { getValueFromLocalStorage, setValueToLocalStorage } from '../services/domain/localStorage';
import { initSortElements } from '../UI/tableView/sort';
import { SortSettings } from '../types/sortSettings';
import { changeAnimeData } from '../services/general';

/** Adds sorting settings to local storage if they are not there. */
function initSortSettings(): void {
  if (getValueFromLocalStorage<SortSettings>(LocalStorageKey.SORT_SETTINGS) === null) {
    setValueToLocalStorage<SortSettings>(LocalStorageKey.SORT_SETTINGS, DEFAULT_SORT_SETTINGS);
  }
}

/**
 * Table initialization and pagination.
 */
const initPage = (): void => {
  renderHeader();

  initSortSettings();
  initSortElements();
  changeAnimeData(Pagination.FIRST_PAGE_NUMBER);
}

window.addEventListener('DOMContentLoaded', initPage);
