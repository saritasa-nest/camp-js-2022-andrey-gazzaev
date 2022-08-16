import { AnimeStatus, AnimeType } from '../../models/anime';

/**
 * Checks if a value is of a enum Status.
 * @param value Some string.
 */
export function isAnimeStatus(value: string): value is AnimeStatus {
  return Object.values(AnimeStatus).includes(value as AnimeStatus);
}

/**
 * Checks if a value is of a enum Type.
 * @param value Some string.
 */
export function isAnimeType(value: string): value is AnimeType {
  return Object.values(AnimeType).includes(value as AnimeType);
}
