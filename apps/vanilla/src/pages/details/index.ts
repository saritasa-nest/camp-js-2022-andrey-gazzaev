import { renderDetailsAnime } from '../../UI/details/details';
import { renderHeader } from '../../UI/header/header';

/** Initializations page. */
function initPage(): void {
  renderHeader();
  renderDetailsAnime();
}

window.addEventListener('DOMContentLoaded', initPage);
