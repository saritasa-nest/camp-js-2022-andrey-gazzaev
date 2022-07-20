/** Information contained in the element. */
export interface ElementAttributesValues {

  /** Element text. */
  readonly text: string;

  /** Is current page. */
  readonly isCurrentPage?: boolean;

  /** The style classes that the element contains. */
  readonly classes?: readonly string[];

  /** The content of the value attribute. */
  readonly value?: string;
}
