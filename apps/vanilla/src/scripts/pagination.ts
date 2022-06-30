import { DEFAULT_OFFSET } from '../constants/anime';
import { C_BTN_PAGINATION } from '../constants/classes';
import { ATR_CLASS } from '../constants/public';

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
  const pageOffset = 3;
  const firstPage = 1;
  const newOffset = currentPageCount * DEFAULT_OFFSET;
  let remainingCountPages = 0;
  if (newOffset > allAnimeCount) {
    remainingCountPages = allAnimeCount / DEFAULT_OFFSET;
  } else {
    remainingCountPages = allAnimeCount - newOffset / DEFAULT_OFFSET;
  }

  let prevPage = 1;
  if (currentPageCount > allAnimeCount) {
    prevPage = allAnimeCount / DEFAULT_OFFSET - pageOffset;
  } else {
    prevPage =
      currentPageCount - pageOffset < firstPage ?
        firstPage :
        currentPageCount - pageOffset;
  }

  const nextPage =
    currentPageCount + pageOffset > remainingCountPages ?
      remainingCountPages :
      currentPageCount + pageOffset;

  return [prevPage, nextPage];
};

/**
 * Creating pagination buttons within certain borders.
 * @param prevPage Left border.
 * @param nextPage Right border.
 * @returns Array of buttons.
 */
const createBtnsPagination = (
  prevPage: number,
  nextPage: number,
): HTMLButtonElement[] => {
  const btnsPagination: HTMLButtonElement[] = [];

  for (let index = prevPage; index <= nextPage; index++) {
    const btn = document.createElement('button');
    btn.setAttribute(ATR_CLASS, C_BTN_PAGINATION);
    btn.innerHTML = String(index);
    btnsPagination.push(btn);
    btn.addEventListener('click', changeAnimeData.bind(null, index));
  }

  return btnsPagination;
};

/**
 * Rendering pagination on the page.
 * @param btns Array of buttons.
 */
const updatePaginationElement = (btns: HTMLButtonElement[]): void => {
  const paginationElement = document.querySelector('.catalog__pagination');

  if (paginationElement) {
    paginationElement.innerHTML = '';
    paginationElement.append(...btns);
  }

};

/**
 * Filling the pagination element relative to the current page.
 * @param allAnimeCount All records that the server can provide.
 * @param currentPageCount Page for which you want to create a pagination.
 */
export const fillPaginationAnime = (
  allAnimeCount: number,
  currentPageCount: number,
): void => {
  const [prevPage, nextPage] = definingPaginationBoundaries(
    allAnimeCount,
    currentPageCount,
  );

  const btnsPagination = createBtnsPagination(prevPage, nextPage);

  return updatePaginationElement(btnsPagination);
};
