import { C_SELECT_SORT_DIRECTION, C_SELECT_SORT_ORDERING, C_SELECT_SORT_STATUS } from '../constants/classes';
import { E_CHANGE } from '../constants/events';
import { ISortSettings } from '../types/anime';

import { changeAnimeData, getLocalSortSettings, setLocalSortSettings } from './public';

/**
 * Changes sort values in local storage and changes the table.
 * @param this Function context.
 * @param field Editable field.
 */
function handleChangeSortSettings(this: HTMLSelectElement, field: string): void {
  // Need to save context
  const sortSettings = getLocalSortSettings();

  if (sortSettings) {
    sortSettings[field] = this.value;
    setLocalSortSettings(sortSettings);
  }

  changeAnimeData(1);
}

/**
 * Sets events to sort selectors.
 */
export const setHandleToSortElements = (): void => {
  const selectors: ISortSettings = {
    direction: C_SELECT_SORT_DIRECTION,
    status: C_SELECT_SORT_STATUS,
    ordering: C_SELECT_SORT_ORDERING,
  };

  for (const key in selectors) {
    if (Object.prototype.hasOwnProperty.call(selectors, key)) {
      const select: HTMLSelectElement | null = document.querySelector(selectors[key]);
      if (select) {
        select.addEventListener(
          E_CHANGE,
          handleChangeSortSettings.bind(select, key),
        );
      }
    }
  }
};
