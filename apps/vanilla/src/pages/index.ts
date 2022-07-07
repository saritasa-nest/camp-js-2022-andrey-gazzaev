import { changeHeader } from '../scripts/header';

/**
 * Initializations page.
 */
function initPage(): void {
  changeHeader();
}

window.addEventListener('DOMContentLoaded', initPage);
