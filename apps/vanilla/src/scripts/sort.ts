import { Catalog } from '../constants/classes';
import { Event } from '../constants/event';
import { FIRST_PAGE } from '../constants/public';
import { SortSettings } from '../types/sortSettings';

import { changeAnimeData, getLocalSortSettings, setLocalSortSettings } from './public';

/**
 * Changes sort values in local storage and changes the table.
 * @param this Function context.
 * @param field Editable field.
 */
function handleChangeSortSettings(this: HTMLSelectElement, field: string): void {
  const sortSettings = getLocalSortSettings();

  if (sortSettings !== null) {
    sortSettings[field] = this.value;
    setLocalSortSettings(sortSettings);
  }

  changeAnimeData(FIRST_PAGE);
}

/**
 * Sets events to sort selectors.
 */
export function setHandleToSortElements(): void {
  const selectors: SortSettings = {
    direction: Catalog.SELECT_SORT_DIRECTION,
    status: Catalog.SELECT_SORT_STATUS,
    ordering: Catalog.SELECT_SORT_ORDERING,
  };

  for (const key in selectors) {
    if (Object.prototype.hasOwnProperty.call(selectors, key)) {
      const select = document.querySelector<HTMLSelectElement>(selectors[key]);
      if (select !== null) {
        select.addEventListener(
          Event.CHANGE,
          handleChangeSortSettings.bind(select, key),
        );
      }
    }
  }
}
