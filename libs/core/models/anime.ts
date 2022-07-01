import { Immerable, OmitImmerable } from './immerable';

/** Describes a value аired. */
export class Aired extends Immerable {

  /** End date Anime. */
  public readonly end: Date;

  /** Start date Anime. */
  public readonly start: Date;

  public constructor(data: PostInitArgsAired) {
    super();
    this.end = data.end;
    this.start = data.start;
  }
}

/** Describes values anime. */
export class Anime extends Immerable {

  /** ID. */
  public readonly id: number;

  /** Created date. */
  public readonly created: Date;

  /** Modified date. */
  public readonly modified: Date;

  /** Url address image. */
  public readonly image: string;

  /** Title in english. */
  public readonly titleEng: string;

  /** Title in Japanese. */
  public readonly titleJpn: string;

  /** Release and end dates. */
  public readonly aired: Aired;

  /** Anime type. */
  public readonly type: string;

  /** Status. */
  public readonly status: string;

  public constructor(data: PostInitArgsAnime) {
    super();
    this.id = data.id;
    this.created = data.created;
    this.modified = data.modified;
    this.image = data.image;
    this.titleEng = data.titleEng;
    this.titleJpn = data.titleJpn;
    this.aired = data.aired;
    this.type = data.type;
    this.status = data.status;
  }
}

type PostInitArgsAired = OmitImmerable<Aired>;
type PostInitArgsAnime = OmitImmerable<Anime>;
