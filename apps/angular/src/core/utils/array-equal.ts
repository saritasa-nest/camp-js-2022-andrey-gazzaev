/**
 * Comparing the values of two arrays.
 * @param s0 First array.
 * @param s1 Second array.
 */
export default function arraysEqual<T>(s0: T[], s1: T[]): boolean {
  if (s0 === s1) {
    return true;
  }

  if (s0 === null || s1 === null) {
    return false;
  }

  if (s0.length !== s1.length) {
    return false;
  }

  for (let i = 0; i < s0.length; ++i) {
    if (s0[i] !== s1[i]) {
      return false;
    }
  }
  return true;
}
