import { TableBlock } from '../../constants/classes';
import { FIRST_PAGE_NUMBER } from '../../constants/pagination';

import { handleChangeAnimeData } from './general';

const ELLIPSIS = '...';
const PAGE_OFFSET = 3;

/** Borders due to which pagination is built. */
interface PaginationBorders {

  /** The first page in pagination. */
  readonly firstPage: number;

  /** The first page, taking into account the offset from the current page. */
  readonly prevPage: number;

  /** The last page, taking into account the offset from the current page. */
  readonly nextPage: number;

  /** The last page in pagination. */
  readonly lastPage: number;
}

/**
 * Defines pagination boundaries relative to the current page.
 * @param allAnimeCount All records that the server can provide.
 * @param currentPageNumber Page for which you want to create a pagination.
 * @param limit Anime limit when requesting a new page.
 */
function definePaginationBoundaries(
  allAnimeCount: number,
  currentPageNumber: number,
  limit: number,
): PaginationBorders {
  const lastPage = Math.ceil(allAnimeCount / limit);

  const prevPage = currentPageNumber - PAGE_OFFSET < FIRST_PAGE_NUMBER ?
    FIRST_PAGE_NUMBER :
    currentPageNumber - PAGE_OFFSET;

  const nextPage = currentPageNumber + PAGE_OFFSET > lastPage ?
    lastPage :
    currentPageNumber + PAGE_OFFSET;

  return {
    firstPage: FIRST_PAGE_NUMBER,
    prevPage,
    nextPage,
    lastPage,
  };
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
 * Creates pagination elements within certain borders.
 * @param paginationBorders Left, right border and first, last page pagination.
 * @param currentPage Page for which you want to create a pagination.
 * @returns Array of buttons.
 */
function createPaginationElements({
  prevPage,
  nextPage,
  lastPage,
}: PaginationBorders, currentPage: number): (HTMLButtonElement | HTMLSpanElement)[] {
  const buttonsPagination: (HTMLButtonElement | HTMLSpanElement)[] = [];

  if (currentPage - PAGE_OFFSET > FIRST_PAGE_NUMBER) {
    buttonsPagination.push(createButton(FIRST_PAGE_NUMBER, false));
    buttonsPagination.push(createSpan(ELLIPSIS, []));
  }

  for (let index = prevPage; index <= nextPage; index++) {
    if (index !== lastPage) {
      const button = createButton(index, currentPage === index);

      buttonsPagination.push(button);
    }
  }

  if (currentPage + PAGE_OFFSET < lastPage - 1) {
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
 * @param limit Anime limit when requesting a new page.
 */
export function fillPaginationAnime(
  allAnimeCount: number,
  currentPage: number,
  limit: number,
): void {
  const paginationBorders = definePaginationBoundaries(
    allAnimeCount,
    currentPage,
    limit,
  );

  const buttonsPagination = createPaginationElements(paginationBorders, currentPage);

  updatePaginationElement(buttonsPagination);
}
