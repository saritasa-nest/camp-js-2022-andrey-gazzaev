import { TableBlock } from '../../constants/classes';
import { Pagination } from '../../constants/pagination';

import { handleChangeAnimeData } from './general';

const ELLIPSIS = '...';

/**
 * Defines pagination boundaries relative to the current page.
 * @param allAnimeCount All records that the server can provide.
 * @param currentPageNumber Page for which you want to create a pagination.
 * @returns An array of borders, where the first element is the left border,
 * the second element is the right border, and the third element is the last page.
 */
function definePaginationBoundaries(
  allAnimeCount: number,
  currentPageNumber: number,
): [number, number, number] {
  const lastPage = Math.ceil(allAnimeCount / Pagination.DEFAULT_LIMIT);

  const prevPage = currentPageNumber - Pagination.PAGE_OFFSET < Pagination.FIRST_PAGE_NUMBER ?
    Pagination.FIRST_PAGE_NUMBER :
    currentPageNumber - Pagination.PAGE_OFFSET;

  const nextPage = currentPageNumber + Pagination.PAGE_OFFSET > lastPage ?
    lastPage :
    currentPageNumber + Pagination.PAGE_OFFSET;

  return [prevPage, nextPage, lastPage];
}

/**
 * Creates a button element for pagination.
 * @param pageNumber The page number the button contains.
 * @param isCurrentPage If button is current then will add class current.
 * @returns Button element.
 */
function createButton(pageNumber: number, isCurrentPage: boolean): HTMLButtonElement {
  const button = document.createElement('button');

  const classes = [TableBlock.BUTTON_PAGINATION];

  if (isCurrentPage) {
    classes.push(TableBlock.PAGINATION_BUTTON_CURRENT);
  }

  button.classList.add(...classes);
  button.setAttribute('type', 'button');
  button.innerHTML = String(pageNumber);
  button.addEventListener('click', () => handleChangeAnimeData(pageNumber));
  return button;
}

/**
 * Creates a span element.
 * @param text The text that contains the element.
 * @param classes The style classes that the element contains.
 * @returns Span element.
 */
function createSpan(text: string, classes: readonly string[]): HTMLSpanElement {
  const span = document.createElement('span');
  span.innerHTML = text;
  span.classList.add(...classes);
  return span;
}

/**
 * Creates pagination buttons within certain borders.
 * @param prevPage Left border.
 * @param nextPage Right border.
 * @param currentPage Page for which you want to create a pagination.
 * @param lastPage The last page.
 * @returns Array of buttons.
 */
function createButtonPagination(
  prevPage: number,
  nextPage: number,
  currentPage: number,
  lastPage: number,
): (HTMLButtonElement | HTMLSpanElement)[] {
  const buttonsPagination: (HTMLButtonElement | HTMLSpanElement)[] = [];

  if (currentPage - Pagination.PAGE_OFFSET > Pagination.FIRST_PAGE_NUMBER) {
    buttonsPagination.push(createButton(Pagination.FIRST_PAGE_NUMBER, false));
    buttonsPagination.push(createSpan(ELLIPSIS, []));
  }

  for (let index = prevPage; index <= nextPage; index++) {
    if (index !== lastPage) {
      const button = createButton(index, currentPage === index);

      buttonsPagination.push(button);
    }
  }

  if (currentPage + Pagination.PAGE_OFFSET < lastPage - 1) {
    buttonsPagination.push(createSpan(ELLIPSIS, []));
    buttonsPagination.push(createButton(lastPage - 1, false));
  }

  return buttonsPagination;
}

/**
 * Renders pagination on the page.
 * @param buttons Array of buttons.
 */
function updatePaginationElement(buttons: readonly (HTMLButtonElement | HTMLSpanElement)[]): void {
  const paginationElement = document.querySelector(`.${TableBlock.PAGINATION}`);

  if (paginationElement !== null) {
    paginationElement.innerHTML = '';
    paginationElement.append(...buttons);
  }
}

/**
 * Fills the pagination element relative to the current page.
 * @param allAnimeCount All records that the server can provide.
 * @param currentPage Page for which you want to create a pagination.
 */
export function fillPaginationAnime(
  allAnimeCount: number,
  currentPage: number,
): void {
  const [prevPage, nextPage, lastPage] = definePaginationBoundaries(
    allAnimeCount,
    currentPage,
  );

  const buttonsPagination = createButtonPagination(prevPage, nextPage, currentPage, lastPage);

  updatePaginationElement(buttonsPagination);
}
