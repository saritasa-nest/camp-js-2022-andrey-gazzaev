import { createSlice } from '@reduxjs/toolkit';

import { fetchAnimeDetailsById } from './dispatchers';

import { entityAdapter, initialState, State } from './state';

export const animeDetailsSlice = createSlice({
  name: 'animeDetails',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchAnimeDetailsById.pending, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(fetchAnimeDetailsById.fulfilled, (state, action) => {
      if (action.payload !== null) {
        entityAdapter.setOne(state as State, action.payload);
      }
      state.isLoading = false;
    })
    .addCase(fetchAnimeDetailsById.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    }),

});
