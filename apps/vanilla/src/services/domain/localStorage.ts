/**
 * Gets some value by key from local storage.
 * @param key The key by which the value is stored.
 * @returns If there are no value, then null otherwise the value object.
 */
export function getValueFromLocalStorage<T>(key: string): T | null {
  const localValue = localStorage.getItem(key);
  if (localValue !== null) {
    return JSON.parse(localValue);
  }
  return null;
}

/**
 * Writes some value by key to local storage.
 * @param key The key by which the value is stored.
 * @param value Some value that needs to be stored.
 */
export function setValueToLocalStorage<T>(key: string, value: T): void {
  if (value !== undefined) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
