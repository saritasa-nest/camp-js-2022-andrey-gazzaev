import { AnimeEnums } from '../utils/types/animeEnums';

import { DateRange } from './dateRange';
import { Immerable, OmitImmerable } from './immerable';

/** Anime. */
export class Anime extends Immerable {

  /** ID. */
  public readonly id: number;

  /** Url address image. */
  public readonly image: string;

  /** Title in English. */
  public readonly titleEnglish: string;

  /** Title in Japanese. */
  public readonly titleJapanese: string;

  /** Release start and end dates. */
  public readonly aired: DateRange;

  /** Anime type. */
  public readonly type: AnimeEnums.Type;

  /** Anime status. */
  public readonly status: AnimeEnums.Status;

  public constructor(data: InitArgsAnime) {
    super();
    this.id = data.id;
    this.image = data.image;
    this.titleEnglish = data.titleEnglish;
    this.titleJapanese = data.titleJapanese;
    this.aired = data.aired;
    this.type = data.type;
    this.status = data.status;
  }
}

type InitArgsAnime = OmitImmerable<Anime>;
