import { isSortField, isSortOrdering, isStatus, isType } from '@js-camp/core/utils/guards/sort.guard';
import { isNotFalsy } from '@js-camp/core/utils/guards/general.guard';

import { SelectorElement } from '../../constants/classes';
import { FIRST_PAGE_NUMBER } from '../../constants/pagination';
import { OPTIONS_FOR_ORDERING, OPTIONS_FOR_SORT_FIELD, OPTIONS_FOR_STATUS, OPTIONS_FOR_TYPE } from '../../constants/select';
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
  const paginationOptions = QueryParamsService.getPaginationParams();
  if (isNotFalsy(paginationOptions)) {
    let { sort, filter } = paginationOptions;

    if (isStatus(selectValue)) {
      filter = { ...paginationOptions.filter, byStatusField: selectValue };
    }

    if (isType(selectValue)) {
      filter = { ...paginationOptions.filter, byTypeField: selectValue };
    }

    if (isSortField(selectValue)) {
      sort = { ...paginationOptions.sort, field: selectValue };
    }

    if (isSortOrdering(selectValue)) {
      sort = { ...paginationOptions.sort, ordering: selectValue };
    }

    QueryParamsService.setPaginationParams({ ...paginationOptions, sort, filter });
  }

  handleChangeAnimeData(FIRST_PAGE_NUMBER);
}

/**
 * Creates a option element.
 * @param optionData Information contained in the option.
 */
function createOption({ text, classes, value }: ElementData): HTMLOptionElement {
  const option = document.createElement('option');
  if (isNotFalsy(value) && isNotFalsy(classes)) {
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
    { name: 'type', selector: SelectorElement.SORT_TYPE, options: OPTIONS_FOR_TYPE },
  ];

  const paginationOptions = QueryParamsService.getPaginationParams();

  if (!isNotFalsy(paginationOptions)) {
    return;
  }

  selectors.forEach(select => {
    const selectElement = document.querySelector<HTMLSelectElement>(`.${select.selector}`);

    if (selectElement !== null) {
      select.options.forEach(option => selectElement.append(createOption({ text: option.text, classes: NO_CLASSES, value: option.value })));

      switch (select.name) {
        case 'ordering':
          selectElement.value = paginationOptions.sort.ordering;
          break;
        case 'sort':
          selectElement.value = paginationOptions.sort.field;
          break;
        case 'status':
          selectElement.value = paginationOptions.filter.byStatusField;
          break;
        case 'type':
          selectElement.value = paginationOptions.filter.byTypeField;
          break;
        default:
          break;
      }

      selectElement.addEventListener(
        'change',
        () => handleChangePaginationOptions(selectElement.value),
      );
    }
  });
}
