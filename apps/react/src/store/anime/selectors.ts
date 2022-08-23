
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { entityAdapter } from './state';

export const { selectAll, selectById } = entityAdapter.getSelectors();

/** Selects anime list. */
export const selectAmineList = createSelector(
  (state: RootState) => selectAll(state.anime),
  animeList => animeList,
);

/** Selects anime loading state. */
export const selectIsAnimeLoading = createSelector(
  (state: RootState) => state.anime.isLoading,
  isLoading => isLoading,
);

/** Selects anime is all state. */
export const selectIsAnimeAll = createSelector(
  (state: RootState) => state.anime.isAll,
  isAll => isAll,
);
