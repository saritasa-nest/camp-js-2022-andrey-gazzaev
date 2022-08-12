import { AnimeType } from '@js-camp/core/models/anime';
import { isType } from '@js-camp/core/utils/guards/sort.guard';

/**
 * Checks if an array of strings is an array of type.
 * @param array Some array.
 */
export function isTypeArray(array: string[]): array is AnimeType[] {
  return array.every(value => isType(value));
}
