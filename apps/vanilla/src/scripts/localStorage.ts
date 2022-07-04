/**
 * Get some value by key from local storage.
 * @param key The key by which the value is stored.
 * @returns If there are no value, then null otherwise the value object.
 */
export function getLocalStorage<T>(key: string): T | null {
  const localValue = localStorage.getItem(key);
  if (localValue !== null) {
    return JSON.parse(localValue);
  }
  return null;
}

/**
 * Write some value by key to local storage.
 * @param key The key by which the value is stored.
 * @param value Some value that needs to be stored.
 */
export function setLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}
