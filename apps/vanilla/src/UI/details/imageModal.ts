import { Card, Modal } from '../../constants/classes';
import { getDomElement } from '../general';

const INVISIBLE_CLASS = 'invisible';

/** Sets image modal. */
export function setImageModal(): void {
  const modalBox = getDomElement<HTMLDivElement>(document, `.${Modal.BOX}`);
  const overlay = getDomElement<HTMLDivElement>(document, `.${Modal.OVERLAY}`);
  const imageElement = getDomElement<HTMLImageElement>(document, `.${Card.IMAGE}`);

  imageElement.addEventListener('click', () => modalBox.classList.remove(INVISIBLE_CLASS));
  overlay.addEventListener('click', () => modalBox.classList.add(INVISIBLE_CLASS));
  window.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
      modalBox.classList.add(INVISIBLE_CLASS);
    }
  });
}
