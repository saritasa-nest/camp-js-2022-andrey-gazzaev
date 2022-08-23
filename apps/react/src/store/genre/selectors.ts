import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { entityAdapter } from './state';

export const { selectAll } = entityAdapter.getSelectors();

/** Selects all genres from store. */
export const selectGenres = createSelector(
  (state: RootState) => selectAll(state.genres),
  genres => genres,
);

/** Selects genres loading state. */
export const selectIsGenresLoading = createSelector(
  (state: RootState) => state.genres.isLoading,
  isLoading => isLoading,
);
