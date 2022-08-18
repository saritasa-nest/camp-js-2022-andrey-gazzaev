import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects all genres from store. */
export const selectUser = createSelector(
  (state: RootState) => state.user.user,
  user => user,
);
