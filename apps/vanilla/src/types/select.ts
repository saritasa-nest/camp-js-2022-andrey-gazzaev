/** The option element. */
export interface Option {

  /** The text that contains the option. */
  readonly text: string;

  /** Option value. */
  readonly value: string;
}

/** Select and its options. */
export interface SelectOptions {

  /** The name of the field used. */
  readonly name: string;

  /** CSS class selector. */
  readonly selector: string;

  /** All select options. */
  readonly options: readonly Option[];
}
