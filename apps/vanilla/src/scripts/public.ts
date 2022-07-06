/**
 * Get value from input element.
 * @param element The element from which you want to get the value.
 * @returns Value of element or null.
 */
export function getValue(element: FormDataEntryValue | null): string | null {
  if (element !== null) {
    return String(element);
  }
  return null;
}

/**
 * Show some error.
 * @param error Error message.
 */
export function showError(error: string): void {
  const errorElement = document.querySelector('.error');

  if (errorElement !== null) {
    errorElement.innerHTML = error;
    errorElement.removeAttribute('hidden');
  }
}
