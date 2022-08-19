import { AnimeBase } from '@js-camp/core/models/anime';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const entityAdapter = createEntityAdapter<AnimeBase>({
  selectId: anime => anime.id,
});

/** Auth state. */
export interface AnimeState {

  /** Whether anime list is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: string;

  /** Error. */
  readonly isAll: boolean;
}

export const initialState = entityAdapter.getInitialState<AnimeState>({
  isLoading: true,
  isAll: false,
});

export type State = typeof initialState;
