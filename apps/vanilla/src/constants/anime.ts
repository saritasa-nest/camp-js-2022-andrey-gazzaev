import { IBaseAnime } from '../types/anime';

export const DEFAULT_OFFSET = 25;
export const ANIME_OBJECT: IBaseAnime = {
  image: 'image',
  titleEng: 'title_eng',
  titleJpn: 'title_jpn',
  aired: {
    end: new Date(0),
    start: new Date(0),
  },
  type: 'type',
  status: 'status',
};
export const LOCAL_STORAGE_SETTINGS = 'sortSettings';
export const DEFAULT_SORT_SETTINGS = {
  ordering: 'id',
  type: 'TV',
};

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
}
