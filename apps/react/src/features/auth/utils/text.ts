/**
 * Replaces text value with placeholder if it is null.
 * @param text Some text.
 * @param placeholder Placeholder like "-", "None".
 */
export function replaceNull(text: string | null, placeholder = '-'): string {
  return text !== null && text !== '' ? text : placeholder;
}
