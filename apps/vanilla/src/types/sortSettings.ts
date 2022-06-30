/** Describes sort settings that are stored in local storage. */
export interface SortSettings {
  [index: string]: string;

  /** Ordering. */
  readonly ordering: string;

  /** Status. */
  readonly status: string;

  /** Direction. */
  readonly direction: string;
}
