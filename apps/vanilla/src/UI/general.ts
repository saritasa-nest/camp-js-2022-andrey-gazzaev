import { isDefined } from '@js-camp/core/utils/guards/general.guard';

const ERROR_CLASS = 'error';
const ELEMENT_NOT_FOUND = 'Element not found';

/**
 * Get DOM element from parent element.
 * @param parentElement The DOM element in which to find the element.
 * @param selector DOM element selector.
 * @returns Can only return an error if the element is not in the DOM.
 * This can happen if the element has not been added to the HTML structure.
 */
export function getDomElement<T extends Element>(
  selector: string,
  parentElement: Document | Element | DocumentFragment = document,
): T {
  const element = parentElement.querySelector<T>(selector);
  if (isDefined(element)) {
    return element;
  }

  throw new Error(`${ELEMENT_NOT_FOUND} by selector ${selector}`);
}

/**
 * Gets value from input element.
 * @param element The element from which you want to get the value.
 * @returns Value of element or null.
 */
export function getElementValue(element: FormDataEntryValue | null): string | null {
  if (isDefined(element)) {
    return String(element);
  }
  return null;
}

/**
 * Shows some error.
 * @param error Error message.
 */
export function showError(error: string): void {
  const errorElement = getDomElement(`.${ERROR_CLASS}`);
  errorElement.innerHTML = error;
  errorElement.removeAttribute('hidden');

}

/** Redirects to home page. */
export function goToHomePage(): void {
  const HOME_PAGE_URL = '/';
  location.href = HOME_PAGE_URL;
}
