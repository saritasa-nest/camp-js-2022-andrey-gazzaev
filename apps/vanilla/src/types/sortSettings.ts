/** Describes the option element. */
export interface SortOption {

  /** The text that contains the option. */
  readonly text: string;

  /** Option value. */
  readonly value: string;
}

/** Describes select and its options. */
export interface SortSelectOptions {

  /** The name of the sort used. */
  readonly sortName: string;

  /** CSS class selector. */
  readonly selector: string;

  /** All select options. */
  readonly options: readonly SortOption[];
}

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
