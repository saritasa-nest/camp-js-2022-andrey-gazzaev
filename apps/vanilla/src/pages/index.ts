import { Event } from '../constants/event';
import { changeHeader } from '../scripts/header';

/**
 * Page initialization and pagination.
 */
function initPage(): void {
  changeHeader();
}

window.addEventListener(Event.DOM_LOADED, initPage);
