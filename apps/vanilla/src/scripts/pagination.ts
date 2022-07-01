
import { AttributeName, AttributeValue } from '../constants/attribute';
import { Catalog } from '../constants/classes';
import { Event } from '../constants/event';
import { ELLIPSIS, PAGE_OFFSET } from '../constants/pagination';
import { DEFAULT_OFFSET, FIRST_PAGE } from '../constants/public';
import { Tag } from '../constants/tag';

import { changeAnimeData } from './public';

/**
 * Defines pagination boundaries relative to the current page.
 * @param allAnimeCount All records that the server can provide.
 * @param currentPageNumber Page for which you want to create a pagination.
 * @returns An array of borders where the first element is the left border and the second element is the right border.
 */
function definingPaginationBoundaries(
  allAnimeCount: number,
  currentPageNumber: number,
): [number, number, number] {
  const lastPage = Math.floor(allAnimeCount / DEFAULT_OFFSET);

  let prevPage = allAnimeCount / DEFAULT_OFFSET - PAGE_OFFSET;
  if (currentPageNumber <= allAnimeCount) {
    prevPage =
      currentPageNumber - PAGE_OFFSET < FIRST_PAGE ?
        FIRST_PAGE :
        currentPageNumber - PAGE_OFFSET;
  }

  const nextPage = currentPageNumber + PAGE_OFFSET > lastPage ?
    lastPage :
    currentPageNumber + PAGE_OFFSET;

  return [prevPage, nextPage, lastPage];
}

/**
 * Creates a button element for pagination.
 * @param pageNumber The page number the button contains.
 * @param classes The style classes that the element contains.
 * @returns Button element.
 */
function createButton(pageNumber: number, classes: readonly string[]): HTMLButtonElement {
  const button = document.createElement(Tag.BUTTON);

  // "c" because "class" is the keyword.
  button.classList.add(...classes.map(c => c.replace('.', '')));
  button.setAttribute(AttributeName.TYPE, AttributeValue.BUTTON);
  button.innerHTML = String(pageNumber);
  button.addEventListener(Event.CLICK, changeAnimeData.bind(null, pageNumber));
  return button;
}

/**
 * Creates a span element.
 * @param text The text that contains the element.
 * @param classes The style classes that the element contains.
 * @returns Span element.
 */
function createSpan(text: string, classes: readonly string[]): HTMLSpanElement {
  const span = document.createElement(Tag.SPAN);
  span.innerHTML = text;

  // "c" because "class" is the keyword.
  span.classList.add(...classes.map(c => c.replace('.', '')));
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

  if (currentPage - PAGE_OFFSET > FIRST_PAGE) {
    buttonsPagination.push(createButton(FIRST_PAGE, [Catalog.BUTTON_PAGINATION]));
    buttonsPagination.push(createSpan(ELLIPSIS, []));
  }

  for (let index = prevPage; index <= nextPage; index++) {
    const button = currentPage === index ?
      createButton(index, [Catalog.BUTTON_PAGINATION, Catalog.PAGINATION_BUTTON_CURRENT]) :
      createButton(index, [Catalog.BUTTON_PAGINATION]);

    buttonsPagination.push(button);
  }

  if (currentPage + PAGE_OFFSET < lastPage) {
    buttonsPagination.push(createSpan(ELLIPSIS, []));
    buttonsPagination.push(createButton(lastPage, [Catalog.BUTTON_PAGINATION]));
  }

  return buttonsPagination;
}

/**
 * Renders pagination on the page.
 * @param buttons Array of buttons.
 */
function updatePaginationElement(buttons: readonly (HTMLButtonElement | HTMLSpanElement)[]): void {
  const paginationElement = document.querySelector(Catalog.PAGINATION);

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
  const [prevPage, nextPage, lastPage] = definingPaginationBoundaries(
    allAnimeCount,
    currentPage,
  );

  const buttonsPagination = createButtonPagination(prevPage, nextPage, currentPage, lastPage);

  return updatePaginationElement(buttonsPagination);
}
