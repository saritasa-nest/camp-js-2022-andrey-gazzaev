export interface IBaseAnime {
  image: string;
  title_eng: string;
  title_jpn: string;
  aired: IAired;
  type: string;
  status: string;
}

export interface IAired {
  end: Date;
  start: Date;
}

export interface IAnime extends IBaseAnime {
  [index: string]: string | number | Date | IAired;
  id: number;
  created: Date;
  modified: Date;
}

export interface IAnimeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IAnime[];
}
