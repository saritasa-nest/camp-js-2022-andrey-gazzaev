import { createSelector, EntityId } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { entityAdapter } from './state';

export const { selectAll, selectById } = entityAdapter.getSelectors();

/** Select anime by ID. */
export const selectAnimeDetailsById = createSelector(
  (state: RootState, id: EntityId) => (selectById(state.animeDetails, id)),
  animeDetails => animeDetails,
);

/** Selects anime loading state. */
export const selectIsAnimeDetailsLoading = createSelector(
  (state: RootState) => state.animeDetails.isLoading,
  isLoading => isLoading,
);
