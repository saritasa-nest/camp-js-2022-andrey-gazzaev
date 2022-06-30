import { DEFAULT_OFFSET, ELLIPSIS, FIRST_PAGE } from '../constants/anime';
import { Catalog } from '../constants/classes';
import { E_CLICK } from '../constants/events';
import { PAGE_OFFSET } from '../constants/pagination';
import { Tag } from '../constants/tags';

import { changeAnimeData } from './public';

/**
 * Defining pagination boundaries relative to the current page.
 * @param allAnimeCount All records that the server can provide.
 * @param currentPageCount Page for which you want to create a pagination.
 * @returns An array of borders where the first element is the left border and the second element is the right border.
 */
const definingPaginationBoundaries = (
  allAnimeCount: number,
  currentPageCount: number,
): number[] => {
  const lastPage = Math.floor(allAnimeCount / DEFAULT_OFFSET);

  let prevPage = 1;
  if (currentPageCount > allAnimeCount) {
    prevPage = allAnimeCount / DEFAULT_OFFSET - PAGE_OFFSET;
  } else {
    prevPage =
      currentPageCount - PAGE_OFFSET < FIRST_PAGE ?
        FIRST_PAGE :
        currentPageCount - PAGE_OFFSET;
  }

   const nextPage = currentPageCount + PAGE_OFFSET > lastPage ?
      lastPage :
      currentPageCount + PAGE_OFFSET;

  return [prevPage, nextPage, lastPage];
};

/**
 * Creating a button element for pagination.
 * @param pageNumber The page number the button contains.
 * @param classes The styles that the element contains.
 * @returns Button element.
 */
const createBtn = (pageNumber: number, classes: string[]): HTMLButtonElement => {
  const btn = document.createElement(Tag.BUTTON);
  btn.classList.add(...classes);
  btn.innerHTML = String(pageNumber);
  btn.addEventListener(E_CLICK, changeAnimeData.bind(null, pageNumber));
  return btn;
};

/**
 * Creating a span element.
 * @param text The text that contains the element.
 * @param classes The styles that the element contains.
 * @returns Span element.
 */
const createSpan = (text: string, classes: string[]): HTMLSpanElement => {
  const span = document.createElement(Tag.SPAN);
  span.innerHTML = text;
  span.classList.add(...classes);
  return span;
};

/**
 * Creating pagination buttons within certain borders.
 * @param prevPage Left border.
 * @param nextPage Right border.
 * @param currentPage Page for which you want to create a pagination.
 * @param lastPage The last page.
 * @returns Array of buttons.
 */
const createBtnsPagination = (
  prevPage: number,
  nextPage: number,
  currentPage: number,
  lastPage: number,
): (HTMLButtonElement | HTMLSpanElement)[] => {
  const btnsPagination: (HTMLButtonElement | HTMLSpanElement)[] = [];

  if (currentPage - PAGE_OFFSET > FIRST_PAGE) {
    btnsPagination.push(createBtn(FIRST_PAGE, [Catalog.BTN_PAGINATION]));
    btnsPagination.push(createSpan(ELLIPSIS, []));
  }

  for (let index = prevPage; index <= nextPage; index++) {
    let btn = null;
    if (currentPage === index) {
      btn = createBtn(index, [Catalog.BTN_PAGINATION, Catalog.PAGINATION_BTN_CURRENT]);
    } else {
      btn = createBtn(index, [Catalog.BTN_PAGINATION]);
    }
    btnsPagination.push(btn);
  }

  if (currentPage + PAGE_OFFSET < lastPage) {
    btnsPagination.push(createSpan(ELLIPSIS, []));
    btnsPagination.push(createBtn(lastPage, [Catalog.BTN_PAGINATION]));
  }
  return btnsPagination;
};

/**
 * Rendering pagination on the page.
 * @param btns Array of buttons.
 */
const updatePaginationElement = (btns: (HTMLButtonElement | HTMLSpanElement)[]): void => {
  const paginationElement = document.querySelector(Catalog.PAGINATION);

  if (paginationElement) {
    paginationElement.innerHTML = '';
    paginationElement.append(...btns);
  }

};

/**
 * Filling the pagination element relative to the current page.
 * @param allAnimeCount All records that the server can provide.
 * @param currentPage Page for which you want to create a pagination.
 */
export const fillPaginationAnime = (
  allAnimeCount: number,
  currentPage: number,
): void => {
  const [prevPage, nextPage, lastPage] = definingPaginationBoundaries(
    allAnimeCount,
    currentPage,
  );

  const btnsPagination = createBtnsPagination(prevPage, nextPage, currentPage, lastPage);

  return updatePaginationElement(btnsPagination);
};
