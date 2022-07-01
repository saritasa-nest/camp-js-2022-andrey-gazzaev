import { Event } from '../constants/event';
import { FIRST_PAGE } from '../constants/public';
import { DEFAULT_SORT_SETTINGS, LOCAL_STORAGE_SETTINGS } from '../constants/sort';
import { changeAnimeData } from '../scripts/public';
import { setHandleToSortElements } from '../scripts/sort';

/**
 * Add sorting settings to local storage if they are not there.
 */
function initSortSettings(): void {
  if (localStorage.getItem(LOCAL_STORAGE_SETTINGS) === null) {
    localStorage.setItem(LOCAL_STORAGE_SETTINGS, JSON.stringify(DEFAULT_SORT_SETTINGS));
  }
}

/**
 * Table initialization and pagination.
 */
function initTable(): Promise<void> {
  initSortSettings();

  setHandleToSortElements();

  return changeAnimeData(FIRST_PAGE);
}

window.addEventListener(Event.DOM_LOADED, initTable);
