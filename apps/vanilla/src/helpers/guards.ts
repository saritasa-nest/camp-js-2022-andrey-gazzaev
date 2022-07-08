import { Status } from '@js-camp/core/models/anime';
import { HttpErrorDto } from '@js-camp/core/dtos/httpError.dto';

import { SortField, SortOrdering } from '../types/paginationSettings';

/**
 * Check if the error is of type HttpErrorDto.
 * @param error Some error.
 */
export function isHttpErrorDto(error: unknown): error is HttpErrorDto {
  return (error as HttpErrorDto).detail !== undefined;
}

/**
 * Checks if a value is of a enum Status.
 * @param value Some string.
 */
export function isStatus(value: string): value is Status {
  return Object.values(Status).includes(value as Status);
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