import { renderHeader } from '../UI/header/header';
import { FIRST_PAGE } from '../constants/public';
import { DEFAULT_SORT_SETTINGS, LOCAL_SORT_SETTINGS } from '../constants/sort';
import { changeAnimeData } from '../scripts/public';
import { setHandleToSortElements } from '../scripts/sort';

/**
 * Add sorting settings to local storage if they are not there.
 */
function initSortSettings(): void {
  if (localStorage.getItem(LOCAL_SORT_SETTINGS) === null) {
    localStorage.setItem(LOCAL_SORT_SETTINGS, JSON.stringify(DEFAULT_SORT_SETTINGS));
  }
}

/**
 * Table initialization and pagination.
 */
const initPage = (): void => {
  renderHeader();

  initSortSettings();
  setHandleToSortElements();

  changeAnimeData(FIRST_PAGE);
};

window.addEventListener('DOMContentLoaded', initPage);
