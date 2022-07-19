import { isDefine } from '@js-camp/core/utils/guards/general.guard';

import { TableBlock } from '../../constants/classes';
import { FIRST_PAGE_NUMBER } from '../../constants/pagination';
import { ElementData } from '../../types/element';
import { PaginationData } from '../../types/paginationSettings';
import { getDomElement } from '../general';

import { handleChangeAnimeData } from './general';

const NO_CLASSES: string[] = [];
const ELLIPSIS = '...';
const PAGE_OFFSET = 3;

/**
 * Creates a button element for pagination.
 * @param buttonData Information contained in the button.
 */
function createButton({ text, isCurrentPage }: ElementData): HTMLButtonElement {
  const button = document.createElement('button');

  const classes = [TableBlock.BUTTON_PAGINATION];

  if (isCurrentPage) {
    classes.push(TableBlock.PAGINATION_BUTTON_CURRENT);
  }

  button.classList.add(...classes);
  button.setAttribute('type', 'button');
  button.innerHTML = text;
  button.addEventListener('click', () => handleChangeAnimeData(Number(text)));
  return button;
}

/**
 * Creates a span element.
 * @param spanData Information contained in the span.
 */
function createSpan({ text, classes }: ElementData): HTMLSpanElement {
  const span = document.createElement('span');
  span.innerHTML = text;
  if (isDefine(classes)) {
    span.classList.add(...classes);
  }
  return span;
}

/**
 * Creates pagination elements within certain borders.
 * @param paginationData Information needed to build pagination.
 * @returns All elements that pagination contains.
 */
function createPaginationElements({ borders, currentPage }: PaginationData): (HTMLButtonElement | HTMLSpanElement)[] {
  const paginationElements: (HTMLButtonElement | HTMLSpanElement)[] = [];

  if (currentPage - PAGE_OFFSET > FIRST_PAGE_NUMBER) {
    paginationElements.push(createButton({ text: String(FIRST_PAGE_NUMBER), isCurrentPage: false }));
    paginationElements.push(createSpan({ text: ELLIPSIS, classes: NO_CLASSES }));
  }

  for (let index = borders.prevPage; index <= borders.nextPage; index++) {
    if (index !== borders.lastPage) {
      const button = createButton({ text: String(index), isCurrentPage: currentPage === index });

      paginationElements.push(button);
    }
  }

  if (currentPage + PAGE_OFFSET < borders.lastPage - 1) {
    paginationElements.push(createSpan({ text: ELLIPSIS, classes: NO_CLASSES }));
    paginationElements.push(createButton({ text: String(borders.lastPage - 1), isCurrentPage: false }));
  }

  return paginationElements;
}

/**
 * Renders pagination on the page.
 * @param elements Array of pagination elements.
 */
function updatePaginationElement(elements: readonly (HTMLButtonElement | HTMLSpanElement)[]): void {
  const paginationElement = getDomElement(document, `.${TableBlock.PAGINATION}`);
  paginationElement.innerHTML = '';
  paginationElement.append(...elements);
}

/**
 * Fills the pagination element relative to the current page.
 * @param paginationData Information needed to build pagination.
 */
export function fillPaginationAnime(
  paginationData: PaginationData,
): void {

  const paginationElements = createPaginationElements(paginationData);

  updatePaginationElement(paginationElements);
}
