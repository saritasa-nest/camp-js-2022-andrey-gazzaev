import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { entityAdapter } from './state';

export const { selectAll } = entityAdapter.getSelectors();

/** Selects all genres from store. */
export const selectUser = createSelector(
  (state: RootState) => selectAll(state.user),
  user => user[0],
);

export const selectAreUserLoading = createSelector(
  (state: RootState) => state.user.isLoading,
  isLoading => isLoading,
);
