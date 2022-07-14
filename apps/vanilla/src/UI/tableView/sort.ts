import { isSortField, isSortOrdering, isStatus } from '@js-camp/core/utils/guards/sort.guard';

import { SelectorElement } from '../../constants/classes';
import { FIRST_PAGE_NUMBER } from '../../constants/pagination';
import { OPTIONS_FOR_ORDERING, OPTIONS_FOR_SORT_FIELD, OPTIONS_FOR_STATUS } from '../../constants/select';
import { SelectOptions } from '../../types/select';
import { ElementData } from '../../types/element';
import { QueryParamsService } from '../../services/domain/queryParams';

import { handleChangeAnimeData } from './general';

const NO_CLASSES: string[] = [];

/**
 * Changes pagination settings.
 * @param selectValue Value of sort or filter select.
 */
function handleChangePaginationOptions(selectValue: string): void {
  const paginationOptions = QueryParamsService.getParams();
  if (paginationOptions !== null) {
    let { sort, filter } = paginationOptions;

    if (isStatus(selectValue)) {
      filter = { ...paginationOptions.filter, byStatusField: selectValue };
    } else if (isSortField(selectValue)) {
      sort = { ...paginationOptions.sort, field: selectValue };
    } else if (isSortOrdering(selectValue)) {
      sort = { ...paginationOptions.sort, ordering: selectValue };
    }

    QueryParamsService.setParams({ ...paginationOptions, sort, filter });
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
