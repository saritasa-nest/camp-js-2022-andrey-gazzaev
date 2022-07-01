import { AttributeName } from '../constants/attribute';
import { Catalog } from '../constants/classes';
import { Event } from '../constants/event';
import { FIRST_PAGE } from '../constants/public';
import { DEFAULT_OPTIONS_FOR_DIRECTION, DEFAULT_OPTIONS_FOR_ORDERING, DEFAULT_OPTIONS_FOR_STATUS } from '../constants/sort';
import { Tag } from '../constants/tag';
import { SortSelectOptions } from '../types/sortSettings';

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

  // "c" because "class" is the keyword.
  option.classList.add(...classes.map(c => c.replace('.', '')));
  return option;
}

/**
 * Adds option elements to select.
 */
export function initSortElements(): void {
  const selectors: SortSelectOptions[] = [
    { sortName: 'direction', selector: Catalog.SELECT_SORT_DIRECTION, options: DEFAULT_OPTIONS_FOR_DIRECTION },
    { sortName: 'status', selector: Catalog.SELECT_SORT_STATUS, options: DEFAULT_OPTIONS_FOR_STATUS },
    { sortName: 'ordering', selector: Catalog.SELECT_SORT_ORDERING, options: DEFAULT_OPTIONS_FOR_ORDERING },
  ];

  selectors.forEach(select => {
    const selectElement = document.querySelector<HTMLSelectElement>(select.selector);

    if (selectElement !== null) {
      // Adding options elements.
      select.options.forEach(option => selectElement.append(createOption(option.text, [], option.value)));

      // Set event to sort selector.
      selectElement.addEventListener(
        Event.CHANGE,
        handleChangeSortSettings.bind(selectElement, select.sortName),
      );
    }
  });

}
