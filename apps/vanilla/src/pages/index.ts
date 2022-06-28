import { changeAnimeData } from '../scipts/public';

/**
 * Table initialization and pagination.
 */
const initTable = () => {
  const firstPage = 1;
  changeAnimeData(firstPage);
}

window.addEventListener('DOMContentLoaded', initTable);

document.querySelector('.catalog__table');
