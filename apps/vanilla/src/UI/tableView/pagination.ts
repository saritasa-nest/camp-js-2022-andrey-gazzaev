import { TableBlock } from '../../constants/classes';
import { FIRST_PAGE_NUMBER } from '../../constants/pagination';
import { ElementData } from '../../types/element';

import { handleChangeAnimeData } from './general';

const NO_CLASSES: string[] = [];
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
  if (classes !== undefined) {
    span.classList.add(...classes);
  }
  return span;
}

/**
 * Creates pagination elements within certain borders.
 * @param paginationBorders Left, right border and first, last page pagination.
 * @param currentPage Page for which you want to create a pagination.
 * @returns All elements that pagination contains.
 */
function createPaginationElements({
  prevPage,
  nextPage,
  lastPage,
}: PaginationBorders, currentPage: number): (HTMLButtonElement | HTMLSpanElement)[] {
  const paginationElements: (HTMLButtonElement | HTMLSpanElement)[] = [];

  if (currentPage - PAGE_OFFSET > FIRST_PAGE_NUMBER) {
    paginationElements.push(createButton({ text: String(FIRST_PAGE_NUMBER), isCurrentPage: false }));
    paginationElements.push(createSpan({ text: ELLIPSIS, classes: NO_CLASSES }));
  }

  for (let index = prevPage; index <= nextPage; index++) {
    if (index !== lastPage) {
      const button = createButton({ text: String(index), isCurrentPage: currentPage === index });

      paginationElements.push(button);
    }
  }

  if (currentPage + PAGE_OFFSET < lastPage - 1) {
    paginationElements.push(createSpan({ text: ELLIPSIS, classes: NO_CLASSES }));
    paginationElements.push(createButton({ text: String(lastPage - 1), isCurrentPage: false }));
  }

  return paginationElements;
}

/**
 * Renders pagination on the page.
 * @param elements Array of pagination elements.
 */
function updatePaginationElement(elements: readonly (HTMLButtonElement | HTMLSpanElement)[]): void {
  const paginationElement = document.querySelector(`.${TableBlock.PAGINATION}`);

  if (paginationElement !== null) {
    paginationElement.innerHTML = '';
    paginationElement.append(...elements);
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

  const paginationElements = createPaginationElements(paginationBorders, currentPage);

  updatePaginationElement(paginationElements);
}
