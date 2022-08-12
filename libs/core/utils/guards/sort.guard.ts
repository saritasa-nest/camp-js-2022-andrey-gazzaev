import { AnimeStatus, AnimeType } from '../../models/anime';

import { SortField, SortDirection } from '../types/sort';

/**
 * Checks if a value is of a enum Status.
 * @param value Some string.
 */
export function isStatus(value: string): value is AnimeStatus {
  return Object.values(AnimeStatus).includes(value as AnimeStatus);
}

/**
 * Checks if a value is of a enum Type.
 * @param value Some string.
 */
export function isType(value: string): value is AnimeType {
  return Object.values(AnimeType).includes(value as AnimeType);
}

/**
 * Checks if a value is of a enum SortOrdering.
 * @param value Some string.
 */
export function isSortOrdering(value: string): value is SortDirection {
  return Object.values(SortDirection).includes(value as SortDirection);
}

/**
 * Checks if a value is of a enum SortField.
 * @param value Some string.
 */
export function isSortField(value: string): value is SortField {
  return Object.values(SortField).includes(value as SortField);
}
