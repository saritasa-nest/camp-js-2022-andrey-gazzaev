export interface IBaseAnime {
  id: number;
  status: string;
  title_eng: string;
  title_jpn: string;
  type: string;
}

export interface IAnime extends IBaseAnime {
  [index: string]: string | number | Date;
  created: Date;
  image: string;
  modified: Date;
}

export interface IAnimeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IAnime[];
}
