import { AttributeName } from '../constants/attribute';
import { Catalog } from '../constants/classes';
import { Event } from '../constants/event';
import { FIRST_PAGE } from '../constants/public';
import { OPTIONS_FOR_DIRECTION, OPTIONS_FOR_ORDERING, OPTIONS_FOR_STATUS, LOCAL_SORT_SETTINGS } from '../constants/sort';
import { Tag } from '../constants/tag';
import { SortSelectOptions, SortSettings } from '../types/sortSettings';

import { getLocalStorage, setLocalStorage } from './localStorage';
import { changeAnimeData } from './public';

/**
 * Changes sort values in local storage and changes the table.
 * @param select Selected select element.
 * @param field Editable field.
 */
function handleChangeSortSettings(select: HTMLSelectElement, field: string): void {
  const sortSettings = getLocalStorage<SortSettings>(LOCAL_SORT_SETTINGS);

  if (sortSettings !== null) {
    sortSettings[field] = select.value;
    setLocalStorage<SortSettings>(LOCAL_SORT_SETTINGS, sortSettings);
  }

  changeAnimeData(FIRST_PAGE);
}

/**
 * Creates a option element.
 * @param text The text that contains the element.
 * @param classes The style classes that the element contains.
 * @param value Value that contains option.
 * @returns Option element.
 */
function createOption(text: string, classes: readonly string[], value: string): HTMLSpanElement {
  const option = document.createElement(Tag.OPTION);
  option.setAttribute(AttributeName.VALUE, value);
  option.innerHTML = text;
  option.classList.add(...classes);
  return option;
}

/**
 * Adds option elements to select.
 */
export function initSortElements(): void {
  const selectors: SortSelectOptions[] = [
    { sortName: 'direction', selector: Catalog.SELECT_SORT_DIRECTION, options: OPTIONS_FOR_DIRECTION },
    { sortName: 'status', selector: Catalog.SELECT_SORT_STATUS, options: OPTIONS_FOR_STATUS },
    { sortName: 'ordering', selector: Catalog.SELECT_SORT_ORDERING, options: OPTIONS_FOR_ORDERING },
  ];

  selectors.forEach(select => {
    const selectElement = document.querySelector<HTMLSelectElement>(`.${select.selector}`);

    if (selectElement !== null) {
      // Adds options elements.
      select.options.forEach(option => selectElement.append(createOption(option.text, [], option.value)));

      // Set event to sort selector.
      selectElement.addEventListener(
        Event.CHANGE,
        () => handleChangeSortSettings(selectElement, select.sortName),
      );
    }
  });

}
