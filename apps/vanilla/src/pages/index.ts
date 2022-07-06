import { renderHeader } from '../UI/header/header';
import { LocalStorageKeys } from '../constants/localStorage';
import { Pagination } from '../constants/pagination';
import { DEFAULT_SORT_SETTINGS } from '../constants/sort';
import { getLocalStorage, setLocalStorage } from '../scripts/localStorage';
import { changeAnimeData } from '../scripts/public';
import { initSortElements } from '../scripts/sort';
import { SortSettings } from '../types/sortSettings';

/** Adds sorting settings to local storage if they are not there. */
function initSortSettings(): void {
  if (getLocalStorage<SortSettings>(LocalStorageKeys.SORT_SETTINGS) === null) {
    setLocalStorage<SortSettings>(LocalStorageKeys.SORT_SETTINGS, DEFAULT_SORT_SETTINGS);
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
