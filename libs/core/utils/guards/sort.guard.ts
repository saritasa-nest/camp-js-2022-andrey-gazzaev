import { AnimeEnums } from '../types/anime.enums';
import { SortField, SortOrdering } from '../types/sort';

/**
 * Checks if a value is of a enum Status.
 * @param value Some string.
 */
export function isStatus(value: string): value is AnimeEnums.Status {
  return Object.values(AnimeEnums.Status).includes(value as AnimeEnums.Status);
}

/**
 * Checks if a value is of a enum Type.
 * @param value Some string.
 */
export function isType(value: string): value is AnimeEnums.Type {
  return Object.values(AnimeEnums.Type).includes(value as AnimeEnums.Type);
}

/**
 * Checks if a value is of a enum SortOrdering.
 * @param value Some string.
 */
export function isSortOrdering(value: string): value is SortOrdering {
  return Object.values(SortOrdering).includes(value as SortOrdering);
}

/**
 * Checks if a value is of a enum SortField.
 * @param value Some string.
 */
export function isSortField(value: string): value is SortField {
  return Object.values(SortField).includes(value as SortField);
}
