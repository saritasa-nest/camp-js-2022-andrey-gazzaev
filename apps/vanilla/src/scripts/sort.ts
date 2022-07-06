import { Selectors } from '../constants/classes';
import { LocalStorageKeys } from '../constants/localStorage';
import { Pagination } from '../constants/pagination';
import { OPTIONS_FOR_DIRECTION, OPTIONS_FOR_ORDERING, OPTIONS_FOR_STATUS } from '../constants/sort';
import { SortSelectOptions, SortSettings } from '../types/sortSettings';

import { getLocalStorage, setLocalStorage } from './localStorage';
import { changeAnimeData } from './public';

/**
 * Changes sort values in local storage and changes the table.
 * @param select Selected select element.
 * @param field Editable field.
 */
function handleChangeSortSettings(select: HTMLSelectElement, field: string): void {
  const sortSettings = getLocalStorage<SortSettings>(LocalStorageKeys.SORT_SETTINGS);

  if (sortSettings !== null) {
    sortSettings[field] = select.value;
    setLocalStorage<SortSettings>(LocalStorageKeys.SORT_SETTINGS, sortSettings);
  }

  changeAnimeData(Pagination.FIRST_PAGE_NUMBER);
}

/**
 * Creates a option element.
 * @param text The text that contains the element.
 * @param classes The style classes that the element contains.
 * @param value Value that contains option.
 * @returns Option element.
 */
function createOption(text: string, classes: readonly string[], value: string): HTMLSpanElement {
  const option = document.createElement('option');
  option.setAttribute('value', value);
  option.innerHTML = text;
  option.classList.add(...classes);
  return option;
}

/** Adds option elements to select. */
export function initSortElements(): void {
  const selectors: SortSelectOptions[] = [
    { sortName: 'direction', selector: Selectors.SELECT_SORT_DIRECTION, options: OPTIONS_FOR_DIRECTION },
    { sortName: 'status', selector: Selectors.SELECT_SORT_STATUS, options: OPTIONS_FOR_STATUS },
    { sortName: 'ordering', selector: Selectors.SELECT_SORT_ORDERING, options: OPTIONS_FOR_ORDERING },
  ];

  selectors.forEach(select => {
    const selectElement = document.querySelector<HTMLSelectElement>(`.${select.selector}`);

    if (selectElement !== null) {
      // Selects should consist of pre-prepared options elements.
      select.options.forEach(option => selectElement.append(createOption(option.text, [], option.value)));

      // Depending on the choice, the table should change.
      selectElement.addEventListener(
        'change',
        () => handleChangeSortSettings(selectElement, select.sortName),
      );
    }
  });

}
