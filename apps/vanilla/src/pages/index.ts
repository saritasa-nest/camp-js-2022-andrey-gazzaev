import { DEFAULT_SORT_SETTINGS, LOCAL_STORAGE_SETTINGS } from '../constants/anime';
import { changeAnimeData } from '../scipts/public';

/**
 * Add sorting settings to local storage if they are not there.
 */
const initSortSettings = (): void => {
  if (localStorage.getItem(LOCAL_STORAGE_SETTINGS)) {
    localStorage.setItem(LOCAL_STORAGE_SETTINGS, JSON.stringify(DEFAULT_SORT_SETTINGS));
  }
};

/**
 * Table initialization and pagination.
 */
const initTable = (): Promise<void> => {
  initSortSettings();

  const firstPage = 1;
  return changeAnimeData(firstPage);
};

window.addEventListener('DOMContentLoaded', initTable);
