import { Genre } from '@js-camp/core/models/genre';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const entityAdapter = createEntityAdapter<Genre>({
  selectId: studio => studio.id,
});

/** Genres state. */
export interface GenresState {

  /** Error. */
  readonly error?: string;

  /** Whether the genres are loading or not. */
  readonly isLoading: boolean;
}

export const initialState = entityAdapter.getInitialState<GenresState>({
  isLoading: true,
});

export type State = typeof initialState;
