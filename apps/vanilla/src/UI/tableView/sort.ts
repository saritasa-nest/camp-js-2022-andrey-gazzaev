import { isSortField, isSortOrdering, isStatus } from '@js-camp/core/utils/guards/sort.guard';

import { SelectorElement } from '../../constants/classes';
import { LocalStorageKey } from '../../constants/localStorage';
import { FIRST_PAGE_NUMBER } from '../../constants/pagination';
import { QueryOptions } from '../../types/paginationSettings';
import { LocalStorageService } from '../../services/domain/localStorage';
import { OPTIONS_FOR_ORDERING, OPTIONS_FOR_SORT_FIELD, OPTIONS_FOR_STATUS } from '../../constants/select';
import { SelectOptions } from '../../types/select';
import { ElementData } from '../../types/element';

import { handleChangeAnimeData } from './general';

const NO_CLASSES: readonly string[] = [];

/**
 * Changes pagination settings.
 * @param value Value of sort, search or filter select.
 */
function handleChangePaginationOptions(value: string): void {
  const paginationOptions = LocalStorageService.getValue<QueryOptions>(LocalStorageKey.PAGINATION_SETTINGS);
  if (paginationOptions !== null) {
    let { sort, filter, search } = paginationOptions;

    if (isStatus(value)) {
      filter = { ...paginationOptions.filter, byStatusField: value };
    } else if (isSortField(value)) {
      sort = { ...paginationOptions.sort, field: value };
    } else if (isSortOrdering(value)) {
      sort = { ...paginationOptions.sort, ordering: value };
    } else {
      search = value;
    }

    LocalStorageService.setValue<QueryOptions>(
      LocalStorageKey.PAGINATION_SETTINGS,
      { ...paginationOptions, sort, filter, search },
    );
  }

  handleChangeAnimeData(FIRST_PAGE_NUMBER);
}

/**
 * Creates a option element.
 * @param optionData Information contained in the option.
 */
function createOption({ text, classes, value }: ElementData): HTMLOptionElement {
  const option = document.createElement('option');
  if (value !== undefined && classes !== undefined) {
    option.setAttribute('value', value);
    option.innerHTML = text;
    option.classList.add(...classes);
  }
  return option;
}

/** Adds option elements to select. */
export function initSortElements(): void {
  const selectors: SelectOptions[] = [
    { name: 'ordering', selector: SelectorElement.SORT_ORDERING, options: OPTIONS_FOR_ORDERING },
    { name: 'status', selector: SelectorElement.SORT_STATUS, options: OPTIONS_FOR_STATUS },
    { name: 'sort', selector: SelectorElement.SORT_FIELD, options: OPTIONS_FOR_SORT_FIELD },
  ];

  selectors.forEach(select => {
    const selectElement = document.querySelector<HTMLSelectElement>(`.${select.selector}`);

    if (selectElement !== null) {
      select.options.forEach(option => selectElement.append(createOption({ text: option.text, classes: NO_CLASSES, value: option.value })));

      selectElement.addEventListener(
        'change',
        () => handleChangePaginationOptions(selectElement.value),
      );
    }
  });
}

/** Add listener to the search. */
export function initSearchElements(): void {
  const searchElement = document.querySelector<HTMLInputElement>('.sort-search');
  if (searchElement !== null) {
    searchElement.addEventListener(
      'input',
      () => handleChangePaginationOptions(searchElement.value),

    );
  }
}
