/**
 * Comparing the values of two arrays.
 * @param array0 First array.
 * @param array1 Second array.
 */
export function arraysEqual<T>(array0: T[], array1: T[]): boolean {
  if (array0 === array1) {
    return true;
  }

  if (array0 === null || array1 === null) {
    return false;
  }

  if (array0.length !== array1.length) {
    return false;
  }

  for (let i = 0; i < array0.length; ++i) {
    if (array0[i] !== array1[i]) {
      return false;
    }
  }
  return true;
}
