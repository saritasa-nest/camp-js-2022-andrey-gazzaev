/**
 * Checks if a value is not falsy.
 * @param value Some value.
 */
export function isNotFalsy<T>(value: T | null | undefined): value is T {
  if (value !== null && value !== undefined) {
    return true;
  }

  if (typeof value === 'string' && value === '') {
    return true;
  }

  if (typeof value === 'number' && value === 0) {
    return true;
  }

  return false;
}
