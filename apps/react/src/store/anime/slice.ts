import { createSlice } from '@reduxjs/toolkit';

import { fetchAnimeList, fetchNextAnimeList } from './dispatchers';

import { entityAdapter, initialState, State } from './state';

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchAnimeList.pending, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(fetchAnimeList.fulfilled, (state, action) => {
      entityAdapter.setAll(state as State, action.payload);
      state.isLoading = false;
    })
    .addCase(fetchAnimeList.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    })
    .addCase(fetchNextAnimeList.pending, state => {
      state.error = undefined;
    })
    .addCase(fetchNextAnimeList.fulfilled, (state, action) => {
      if (action.payload === null) {
        state.isAll = true;
        entityAdapter.addMany(state as State, []);
      } else {
        entityAdapter.addMany(state as State, action.payload);
      }
    })
    .addCase(fetchNextAnimeList.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
    }),
});
