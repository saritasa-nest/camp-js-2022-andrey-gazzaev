export type PostStudioDto = Omit<StudioDto, 'id'>;

/** Studio. */
export interface StudioDto {

  /** ID. */
  readonly id: number;

  /** Name of studio. */
  readonly name: string;
}
