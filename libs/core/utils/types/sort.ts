/** Sort settings. */
export interface Sort<Order, Field> {

  /** Ordering direction. */
  readonly direction: Order;

  /** Field by sort. */
  readonly field: Field;
}

/** Fields by which you can sort. */
export enum SortField {
  TitleEnglish = 'title_eng',
  TitleJapanese = 'title_jpn',
  Aired = 'aired',
  Status = 'status',
}

/** Ordering direction. */
export enum SortDirection {
  Ascending = '',
  Descending = '-',
}
