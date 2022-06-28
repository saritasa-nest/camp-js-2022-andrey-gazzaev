import { DEFAULT_OFFSET } from "../constants/anime";
import { changeAnimeData } from "./public";

/**
 * Filling the pagination element relative to the current page.
 * @param allAnimeCount All records that the server can provide.
 * @param currentPageCount Page for which you want to create a pagination.
 */
export const fillPaginationAnime = (
    allAnimeCount: number,
    currentPageCount: number
  ) => {
    const defaultOffset = 25;
    const newOffset = currentPageCount * DEFAULT_OFFSET;
    let remainingCountPages = 0;
  
    if (newOffset > allAnimeCount) {
      remainingCountPages = allAnimeCount / DEFAULT_OFFSET;
    } else {
      remainingCountPages = allAnimeCount - newOffset / defaultOffset;
    }
  
    let prevPage = 1;
    if (currentPageCount > allAnimeCount) {
      prevPage = allAnimeCount / defaultOffset - 3;
    } else {
      prevPage = currentPageCount - 3 < 1 ? 1 : currentPageCount - 3;
    }
  
    let nextPage =
      currentPageCount + 3 > remainingCountPages
        ? remainingCountPages
        : currentPageCount + 3;
  
    const btnsPagination: HTMLButtonElement[] = [];
    for (let index = prevPage; index <= nextPage; index++) {
      const btn = document.createElement('button');
      btn.innerHTML = String(index);
      btnsPagination.push(btn);
      btn.addEventListener('click', changeAnimeData.bind(null, index));
    }
  
    const paginationElement = document.querySelector('.catalog__pagination');
    if (paginationElement) {
      paginationElement.innerHTML = '';
      paginationElement.append(...btnsPagination);
    }
  };