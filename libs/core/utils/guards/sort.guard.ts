import { Status, Type } from '../../models/anime';

import { SortField, SortOrdering } from '../types/sort';

/**
 * Checks if a value is of a enum Status.
 * @param value Some string.
 */
export function isStatus(value: string): value is Status {
  return Object.values(Status).includes(value as Status);
}

/**
 * Checks if a value is of a enum Type.
 * @param value Some string.
 */
export function isType(value: string): value is Type {
  return Object.values(Type).includes(value as Type);
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
