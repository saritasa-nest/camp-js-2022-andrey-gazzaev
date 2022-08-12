/** Sort settings. */
export interface Sort<TOrder, TField> {

  /** Ordering direction. */
  readonly direction: TOrder;

  /** Field by sort. */
  readonly field: TField;
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
