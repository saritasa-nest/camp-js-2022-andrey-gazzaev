
export const FIRST_PAGE = 1;
export const DEFAULT_OFFSET = 25;
export const ANIME_OBJECT = {
  image: '',
  titleEng: '',
  titleJpn: '',
  aired: '',
  type: '',
  status: '',
};
export const LOCAL_STORAGE_SETTINGS = 'sortSettings';
export const LOCAL_CURRENT_PAGE = 'currentPage';
export const DEFAULT_SORT_SETTINGS = {
  ordering: 'title_eng',
  direction: '',
  status: 'AIRING',
};
export const ELLIPSIS = '...';
export const NO_DATA = '-';

/**
 * Used to define the request header.
 */
export enum AnimeFetchHeaders {
  ApiKey = 'Api-Key',
}

/**
 * Used to work switch case.
 */
export enum AnimeSwitchCase {
  Image = 'image',
  TitleEng = 'titleEng',
  TitleJpn = 'titleJpn',
  Aired = 'aired',
  AiredStart = 'aired.start',
  Type = 'type',
  Status = 'status',
}
