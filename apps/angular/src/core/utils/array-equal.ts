/**
 * Comparing the values of two arrays.
 * @param firstArray First array.
 * @param secondArray Second array.
 */
export function arraysEqual<T>(firstArray: T[], secondArray: T[]): boolean {
  if (firstArray === secondArray) {
    return true;
  }

  if (firstArray === null || secondArray === null) {
    return false;
  }

  if (firstArray.length !== secondArray.length) {
    return false;
  }

  for (let i = 0; i < firstArray.length; ++i) {
    if (firstArray[i] !== secondArray[i]) {
      return false;
    }
  }
  return true;
}
