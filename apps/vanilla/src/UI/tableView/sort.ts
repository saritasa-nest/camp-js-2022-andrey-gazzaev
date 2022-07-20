import { isSortField, isSortOrdering, isStatus, isType } from '@js-camp/core/utils/guards/sort.guard';
import { isDefine } from '@js-camp/core/utils/guards/general.guard';

import { SelectorElement } from '../../constants/classes';
import { FIRST_PAGE_NUMBER } from '../../constants/pagination';
import { Options } from '../../constants/select';
import { SelectOptions } from '../../types/select';
import { ElementAttributesValues } from '../../types/element';
import { QueryParamsService } from '../../services/domain/queryParams';
import { getDomElement } from '../general';

import { handleChangeAnimePage } from './general';

const NO_CLASSES: string[] = [];

/**
 * Changes pagination settings.
 * @param selectValue Value of sort or filter select.
 * @param selectName Name of sort or filter select.
 */
function handleChangePaginationOptions(selectValue: string, selectName: string): void {
  const paginationOptions = QueryParamsService.getPaginationParams();
  if (isDefine(paginationOptions)) {
    let { sort, filter } = paginationOptions;

    if (selectName === 'status' && (isStatus(selectValue) || selectValue === '')) {
      filter = { ...paginationOptions.filter, byStatusField: selectValue };
    } else if (selectName === 'type' && (isType(selectValue) || selectValue === '')) {
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

  handleChangeAnimePage(FIRST_PAGE_NUMBER);
}

/**
 * Creates a option element.
 * @param optionData Information contained in the option.
 */
function createOption({ text, classes, value }: ElementAttributesValues): HTMLOptionElement {
  const option = document.createElement('option');
  if (isDefine(value) && isDefine(classes)) {
    option.setAttribute('value', value);
    option.innerHTML = text;
    option.classList.add(...classes);
  }
  return option;
}

/** Adds option elements to select. */
export function initSortElements(): void {
  const selectors: SelectOptions[] = [
    { name: 'ordering', selector: SelectorElement.SORT_ORDERING, options: Options.ORDERING },
    { name: 'status', selector: SelectorElement.SORT_STATUS, options: Options.STATUS },
    { name: 'sort', selector: SelectorElement.SORT_FIELD, options: Options.SORT_FIELD },
    { name: 'type', selector: SelectorElement.SORT_TYPE, options: Options.TYPE },
  ];

  const paginationOptions = QueryParamsService.getPaginationParams();

  if (!isDefine(paginationOptions)) {
    return;
  }

  selectors.forEach(select => {
    const selectElement = getDomElement<HTMLSelectElement>(document, `.${select.selector}`);

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
      () => handleChangePaginationOptions(selectElement.value, select.name),
    );
  });
}
