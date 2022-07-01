
import { Catalog } from '../constants/classes';
import { Event } from '../constants/events';
import { ELLIPSIS, PAGE_OFFSET } from '../constants/pagination';
import { DEFAULT_OFFSET, FIRST_PAGE } from '../constants/public';
import { Tag } from '../constants/tags';

import { changeAnimeData } from './public';

/**
 * Defining pagination boundaries relative to the current page.
 * @param allAnimeCount All records that the server can provide.
 * @param currentPageCount Page for which you want to create a pagination.
 * @returns An array of borders where the first element is the left border and the second element is the right border.
 */
function definingPaginationBoundaries(
  allAnimeCount: number,
  currentPageCount: number,
): number[] {
  const lastPage = Math.floor(allAnimeCount / DEFAULT_OFFSET);

  let prevPage = allAnimeCount / DEFAULT_OFFSET - PAGE_OFFSET;
  if (currentPageCount <= allAnimeCount) {
    prevPage =
      currentPageCount - PAGE_OFFSET < FIRST_PAGE ?
        FIRST_PAGE :
        currentPageCount - PAGE_OFFSET;
  }

  const nextPage = currentPageCount + PAGE_OFFSET > lastPage ?
    lastPage :
    currentPageCount + PAGE_OFFSET;

  return [prevPage, nextPage, lastPage];
}

/**
 * Creating a button element for pagination.
 * @param pageNumber The page number the button contains.
 * @param classes The styles that the element contains.
 * @returns Button element.
 */
function createBtn(pageNumber: number, classes: string[]): HTMLButtonElement {
  const button = document.createElement(Tag.BUTTON);

  // "c" because "class" is the keyword.
  button.classList.add(...classes.map(c => c.replace('.', '')));
  button.innerHTML = String(pageNumber);
  button.addEventListener(Event.CLICK, changeAnimeData.bind(null, pageNumber));
  return button;
}

/**
 * Creating a span element.
 * @param text The text that contains the element.
 * @param classes The styles that the element contains.
 * @returns Span element.
 */
function createSpan(text: string, classes: string[]): HTMLSpanElement {
  const span = document.createElement(Tag.SPAN);
  span.innerHTML = text;

  // "c" because "class" is the keyword.
  span.classList.add(...classes.map(c => c.replace('.', '')));
  return span;
}

/**
 * Creating pagination buttons within certain borders.
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

  if (currentPage - PAGE_OFFSET > FIRST_PAGE) {
    buttonsPagination.push(createBtn(FIRST_PAGE, [Catalog.BUTTON_PAGINATION]));
    buttonsPagination.push(createSpan(ELLIPSIS, []));
  }

  for (let index = prevPage; index <= nextPage; index++) {
    const button = currentPage === index ?
      createBtn(index, [Catalog.BUTTON_PAGINATION, Catalog.PAGINATION_BUTTON_CURRENT]) :
      createBtn(index, [Catalog.BUTTON_PAGINATION]);

    buttonsPagination.push(button);
  }

  if (currentPage + PAGE_OFFSET < lastPage) {
    buttonsPagination.push(createSpan(ELLIPSIS, []));
    buttonsPagination.push(createBtn(lastPage, [Catalog.BUTTON_PAGINATION]));
  }

  return buttonsPagination;
}

/**
 * Rendering pagination on the page.
 * @param buttons Array of buttons.
 */
function updatePaginationElement(buttons: (HTMLButtonElement | HTMLSpanElement)[]): void {
  const paginationElement = document.querySelector(Catalog.PAGINATION);

  if (paginationElement !== null) {
    paginationElement.innerHTML = '';
    paginationElement.append(...buttons);
  }
}

/**
 * Filling the pagination element relative to the current page.
 * @param allAnimeCount All records that the server can provide.
 * @param currentPage Page for which you want to create a pagination.
 */
export function fillPaginationAnime(
  allAnimeCount: number,
  currentPage: number,
): void {
  const [prevPage, nextPage, lastPage] = definingPaginationBoundaries(
    allAnimeCount,
    currentPage,
  );

  const buttonsPagination = createButtonPagination(prevPage, nextPage, currentPage, lastPage);

  return updatePaginationElement(buttonsPagination);
}
