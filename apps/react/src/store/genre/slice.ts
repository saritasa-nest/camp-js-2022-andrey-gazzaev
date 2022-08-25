import { createSlice } from '@reduxjs/toolkit';

import { fetchedGenres } from './dispatchers';
import { entityAdapter, initialState, State } from './state';

export const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    addedGenres(state, action) {
      entityAdapter.addMany(state as State, action.payload);
    },
  },
  extraReducers: builder => builder
    .addCase(fetchedGenres.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchedGenres.fulfilled, (state, action) => {
      entityAdapter.setAll(state as State, action.payload);
      state.isLoading = false;
    })
    .addCase(fetchedGenres.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    }),
});

export const { addedGenres } = genresSlice.actions;
