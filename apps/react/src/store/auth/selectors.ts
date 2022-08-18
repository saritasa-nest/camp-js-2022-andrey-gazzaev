import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects auth loading state. */
export const selectAreAuthLoading = createSelector(
  (state: RootState) => state.auth.isLoading,
  isLoading => isLoading,
);

/** Selects auth loading state. */
export const selectIsSubmit = createSelector(
  (state: RootState) => state.auth.isSubmit,
  isSubmit => isSubmit,
);

/** Selects auth error state. */
export const selectError = createSelector(
  (state: RootState) => state.auth.error,
  error => error,
);
