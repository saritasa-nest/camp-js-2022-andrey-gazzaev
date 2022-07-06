import { changeHeader } from '../scripts/header';

/**
 * Page initialization and pagination.
 */
function initPage(): void {
  changeHeader();
}

window.addEventListener('DOMContentLoaded', initPage);
