import { renderHeader } from '../UI/header/header';

/** Initializations page. */
function initPage(): void {
  renderHeader();
}

window.addEventListener('DOMContentLoaded', initPage);
