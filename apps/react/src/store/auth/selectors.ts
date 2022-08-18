import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const selectUser = createSelector((state: RootState) => state.auth.user, user => user);

/** Selects auth loading state. */
export const selectAreAuthLoading = createSelector(
  (state: RootState) => state.auth.isLoading,
  isLoading => isLoading,
);

/** Selects auth loading state. */
export const selectError = createSelector(
  (state: RootState) => state.auth.error,
  error => error,
);
