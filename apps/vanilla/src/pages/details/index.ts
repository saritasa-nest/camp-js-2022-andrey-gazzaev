import { renderDetailsAnime } from '../../UI/details/details';
import { setLightBox } from '../../UI/details/lightBox';
import { getDomElement } from '../../UI/general';
import { renderHeader } from '../../UI/header/header';

const BACK_LINK_CLASS = 'back-link';

/** Initializations page. */
function initPage(): void {
  renderHeader();

  getDomElement(document, `.${BACK_LINK_CLASS}`).addEventListener('click', () => window.history.back());

  renderDetailsAnime();
  setLightBox();
}

window.addEventListener('DOMContentLoaded', initPage);
window.addEventListener('popstate', () => window.history.go());
