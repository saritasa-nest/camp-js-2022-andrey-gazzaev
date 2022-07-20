/**
 * Checks if a value is defined.
 * @param value Some value.
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  if (value !== null && value !== undefined) {
    return true;
  }
  return false;
}
