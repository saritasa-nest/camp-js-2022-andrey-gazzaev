import { Type } from '@js-camp/core/models/anime';
import { isType } from '@js-camp/core/utils/guards/sort.guard';

/**
 * Checks if an array of strings is an array of type.
 * @param array Some array.
 */
export function isTypeArray(array: string[]): array is Type[] {
  return array.every(value => isType(value));
}
