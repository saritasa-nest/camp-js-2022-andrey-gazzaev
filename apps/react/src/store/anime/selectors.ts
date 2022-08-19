
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { entityAdapter } from './state';

export const { selectAll } = entityAdapter.getSelectors();

/** Selects user from store. */
export const selectAmineList = createSelector(
  (state: RootState) => selectAll(state.anime),
  animeList => animeList,
);

/** Selects anime loading state. */
export const selectAreAnimeLoading = createSelector(
  (state: RootState) => state.anime.isLoading,
  isLoading => isLoading,
);

/** Selects anime is all state. */
export const selectAreAnimeAll = createSelector(
  (state: RootState) => state.anime.isAll,
  isAll => isAll,
);
