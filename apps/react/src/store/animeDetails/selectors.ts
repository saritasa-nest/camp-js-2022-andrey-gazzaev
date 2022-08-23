import { createSelector, EntityId } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { entityAdapter } from './state';

export const { selectAll, selectById } = entityAdapter.getSelectors();

export const selectAnimeDetailsById = createSelector(
  (state: RootState, id: EntityId) => (selectById(state.animeDetails, id)),
  animeDetails => animeDetails,
);
