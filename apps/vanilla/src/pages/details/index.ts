import { renderAnimeDetails } from '../../UI/details/details';
import { setImageModal } from '../../UI/details/imageModal';
import { getDomElement } from '../../UI/general';
import { renderHeader } from '../../UI/header/header';

const BACK_LINK_CLASS = 'back-link';

/** Initializations page. */
function initPage(): void {
  renderHeader();

  getDomElement(`.${BACK_LINK_CLASS}`).addEventListener('click', () => window.history.back());

  renderAnimeDetails();
  setImageModal();
}

window.addEventListener('DOMContentLoaded', initPage);
window.addEventListener('popstate', () => window.history.go());
