import { LocalStorageKey } from '../constants/localStorage';
import { DEFAULT_ANIME_SETTINGS, FIRST_PAGE_NUMBER } from '../constants/pagination';
import { initSearchElements, initSortElements } from '../UI/tableView/sort';
import { QueryOptions } from '../types/animeSettings';
import { handleChangeAnimeData } from '../UI/tableView/general';
import { LocalStorageService } from '../services/domain/localStorage';

/** Adds sorting settings to local storage if they are not there. */
function initSortSettings(): void {
  if (LocalStorageService.getValue<QueryOptions>(LocalStorageKey.ANIME_SETTINGS) === null) {
    LocalStorageService.setValue<QueryOptions>(
      LocalStorageKey.ANIME_SETTINGS,
      DEFAULT_ANIME_SETTINGS,
    );
  }
}

/** Initialization home page. */
function initHomePage(): void {
  initSortSettings();
  initSortElements();
  initSearchElements();
  handleChangeAnimeData(FIRST_PAGE_NUMBER);
}

window.addEventListener('DOMContentLoaded', initHomePage);
