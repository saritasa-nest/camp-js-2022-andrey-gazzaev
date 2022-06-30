/**
 * Describes sort settings that are stored in local storage.
 */
export interface ISortSettings {
  [index: string]: string;

  /**
   * Ordering.
   */
  ordering: string;

  /**
   * Status.
   */
  status: string;

  /**
   * Direction.
   */
  direction: string;
}
