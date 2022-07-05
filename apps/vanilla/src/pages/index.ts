import { renderHeader } from '../UI/header/header';
import { FIRST_PAGE_NUMBER } from '../constants/public';
import { DEFAULT_SORT_SETTINGS, LOCAL_SORT_SETTINGS } from '../constants/sort';
import { getLocalStorage, setLocalStorage } from '../scripts/localStorage';
import { changeAnimeData } from '../scripts/public';
import { initSortElements } from '../scripts/sort';
import { SortSettings } from '../types/sortSettings';

/** Adds sorting settings to local storage if they are not there. */
function initSortSettings(): void {
  if (getLocalStorage<SortSettings>(LOCAL_SORT_SETTINGS) === null) {
    setLocalStorage<SortSettings>(LOCAL_SORT_SETTINGS, DEFAULT_SORT_SETTINGS);
  }
}

/**
 * Table initialization and pagination.
 */
const initPage = (): void => {
  renderHeader();

  initSortSettings();
  initSortElements();
  changeAnimeData(FIRST_PAGE_NUMBER);
}

window.addEventListener('DOMContentLoaded', initPage);
