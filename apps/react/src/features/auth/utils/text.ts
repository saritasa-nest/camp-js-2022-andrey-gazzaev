/**
 * Replaces text value with '-' if it is null.
 * @param text Some text.
 */
export function replaceNull(text: string | null): string {
  return text !== null && text !== '' ? text : '-';
}
