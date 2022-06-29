import { DEFAULT_OFFSET } from '../constants/anime';
import { changeAnimeData } from './public';

const paginationBorderDetection = (
  allAnimeCount: number,
  currentPageCount: number
) => {
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
      currentPageCount - pageOffset < firstPage
        ? firstPage
        : currentPageCount - pageOffset;
  }

  let nextPage =
    currentPageCount + pageOffset > remainingCountPages
      ? remainingCountPages
      : currentPageCount + pageOffset;

  return [prevPage, nextPage];
};

const createBtnsPagination = (prevPage: number, nextPage: number) => {
  const btnsPagination: HTMLButtonElement[] = [];

  for (let index = prevPage; index <= nextPage; index++) {
    const btn = document.createElement('button');
    btn.innerHTML = String(index);
    btnsPagination.push(btn);
    btn.addEventListener('click', changeAnimeData.bind(null, index));
  }

  return btnsPagination;
};

const updatePaginationElememt = (btns: HTMLButtonElement[]) => {
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
  currentPageCount: number
) => {
  const [prevPage, nextPage] = paginationBorderDetection(
    allAnimeCount,
    currentPageCount
  );

  const btnsPagination = createBtnsPagination(prevPage, nextPage);

  updatePaginationElememt(btnsPagination);
};
