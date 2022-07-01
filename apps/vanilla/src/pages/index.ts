import { Event } from '../constants/event';
import { FIRST_PAGE } from '../constants/public';
import { DEFAULT_SORT_SETTINGS, LOCAL_SORT_SETTINGS } from '../constants/sort';
import { changeAnimeData } from '../scripts/public';
import { initSortElements } from '../scripts/sort';

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
function initTable(): Promise<void> {
  initSortSettings();

  initSortElements();

  return changeAnimeData(FIRST_PAGE);
}

window.addEventListener(Event.DOM_LOADED, initTable);
