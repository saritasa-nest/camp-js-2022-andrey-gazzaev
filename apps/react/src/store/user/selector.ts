import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { entityAdapter } from './state';

export const { selectAll } = entityAdapter.getSelectors();

/** Selects user from store. */
export const selectUser = createSelector(
  (state: RootState) => selectAll(state.user),
  user => user[0] === undefined ? null : user[0],
);

/** Selects user loading state. */
export const selectIsUserLoading = createSelector(
  (state: RootState) => state.user.isLoading,
  isLoading => isLoading,
);
