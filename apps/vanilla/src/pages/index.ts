
import { changeAnimeData } from '../scipts/public';
import { renderHeader } from '../UI/header/header';

/** Initializations page. */
function initPage(): void {
  renderHeader();
  const firstPage = 1;
  changeAnimeData(firstPage);
}

window.addEventListener('DOMContentLoaded', initPage);
