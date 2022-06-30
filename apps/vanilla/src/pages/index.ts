import { DEFAULT_SORT_SETTINGS, LOCAL_STORAGE_SETTINGS } from '../constants/anime';
import { changeAnimeData } from '../scripts/public';
import { setHandleToSortElements } from '../scripts/sort';

/**
 * Add sorting settings to local storage if they are not there.
 */
const initSortSettings = (): void => {
  if (!localStorage.getItem(LOCAL_STORAGE_SETTINGS)) {
    localStorage.setItem(LOCAL_STORAGE_SETTINGS, JSON.stringify(DEFAULT_SORT_SETTINGS));
  }
};

/**
 * Table initialization and pagination.
 */
const initTable = (): Promise<void> => {
  initSortSettings();
  setHandleToSortElements();
  const firstPage = 1;
  return changeAnimeData(firstPage);
};

window.addEventListener('DOMContentLoaded', initTable);
