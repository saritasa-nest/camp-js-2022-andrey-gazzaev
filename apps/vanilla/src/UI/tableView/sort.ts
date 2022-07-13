import { isSortField, isSortOrdering, isStatus } from '@js-camp/core/guards/sort.guard';

import { SelectorElement } from '../../constants/classes';
import { LocalStorageKey } from '../../constants/localStorage';
import { FIRST_PAGE_NUMBER } from '../../constants/pagination';
import { PaginationOptions } from '../../types/paginationSettings';
import { LocalStorageService } from '../../services/domain/localStorage';
import { OPTIONS_FOR_ORDERING, OPTIONS_FOR_SORT_FIELD, OPTIONS_FOR_STATUS } from '../../constants/select';
import { SelectOptions } from '../../types/select';

import { handleChangeAnimeData } from './general';

/**
 * Changes pagination settings.
 * @param selectValue Value of sort or filter select.
 */
function handleChangePaginationOptions(selectValue: string): void {
  const paginationOptions = LocalStorageService.getValue<PaginationOptions>(LocalStorageKey.PAGINATION_SETTINGS);
  if (paginationOptions !== null) {
    let { sort, filter } = paginationOptions;

    if (isStatus(selectValue)) {
      filter = { ...paginationOptions.filter, byStatusField: selectValue };
    } else if (isSortField(selectValue)) {
      sort = { ...paginationOptions.sort, field: selectValue };
    } else if (isSortOrdering(selectValue)) {
      sort = { ...paginationOptions.sort, ordering: selectValue };
    }

    LocalStorageService.setValue<PaginationOptions>(
      LocalStorageKey.PAGINATION_SETTINGS,
      { ...paginationOptions, sort, filter },
    );
  }

  handleChangeAnimeData(FIRST_PAGE_NUMBER);
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
  const selectors: SelectOptions[] = [
    { name: 'ordering', selector: SelectorElement.SELECT_SORT_ORDERING, options: OPTIONS_FOR_ORDERING },
    { name: 'status', selector: SelectorElement.SELECT_SORT_STATUS, options: OPTIONS_FOR_STATUS },
    { name: 'sort', selector: SelectorElement.SELECT_SORT_FIELD, options: OPTIONS_FOR_SORT_FIELD },
  ];

  selectors.forEach(select => {
    const selectElement = document.querySelector<HTMLSelectElement>(`.${select.selector}`);

    if (selectElement !== null) {
      select.options.forEach(option => selectElement.append(createOption(option.text, [], option.value)));

      selectElement.addEventListener(
        'change',
        () => handleChangePaginationOptions(selectElement.value),
      );
    }
  });
}
