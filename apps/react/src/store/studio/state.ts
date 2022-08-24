import { Studio } from '@js-camp/core/models/studio';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const entityAdapter = createEntityAdapter<Studio>({
  selectId: studio => studio.id,
});

/** Studios state. */
export interface StudiosState {

  /** Error. */
  readonly error?: string;

  /** Whether the studios are loading or not. */
  readonly isLoading: boolean;
}

export const initialState = entityAdapter.getInitialState<StudiosState>({
  isLoading: true,
});

export type State = typeof initialState;
