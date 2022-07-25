import { getDomElement } from '../general';

const INVISIBLE_CLASS = 'invisible';

/** The class names for the image modal block. */
export namespace ModalClass {
  export const BOX = 'modal-box';
  export const OVERLAY = 'overlay';
  export const IMAGE = 'modal-box__image';
}

/** Sets image modal. */
export function setImageModal(): void {
  const modalBox = getDomElement<HTMLDivElement>(`.${ModalClass.BOX}`);
  const overlay = getDomElement<HTMLDivElement>(`.${ModalClass.OVERLAY}`);
  const imageElement = getDomElement<HTMLImageElement>('.details__image');

  imageElement.addEventListener('click', () => modalBox.classList.remove(INVISIBLE_CLASS));
  overlay.addEventListener('click', () => modalBox.classList.add(INVISIBLE_CLASS));
  window.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
      modalBox.classList.add(INVISIBLE_CLASS);
    }
  });
}
