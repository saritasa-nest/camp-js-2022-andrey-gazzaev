import { changeAnimeData } from '../scipts/public';

/**
 * Table initialization and pagination.
 */
const initTable = (): Promise<void> => {
  const firstPage = 1;
  return changeAnimeData(firstPage);
};

window.addEventListener('DOMContentLoaded', initTable);
