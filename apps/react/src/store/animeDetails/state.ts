import { AnimeDetails } from '@js-camp/core/models/animeDetails';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const entityAdapter = createEntityAdapter<AnimeDetails>({
  selectId: anime => anime.id,
});

/** Anime details state. */
export interface AnimeDetailsState {

  /** Whether anime details is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: string;
}

export const initialState = entityAdapter.getInitialState<AnimeDetailsState>({
  isLoading: true,
});

export type State = typeof initialState;
