import { createSlice } from '@reduxjs/toolkit';

import { fetchedAnimeList, fetchedNextAnimeList } from './dispatchers';

import { entityAdapter, initialState, State } from './state';

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    removeAnimeList(state) {
      entityAdapter.removeAll(state as State);
    },
  },
  extraReducers: builder => builder
    .addCase(fetchedAnimeList.pending, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(fetchedAnimeList.fulfilled, (state, action) => {
      entityAdapter.setAll(state as State, action.payload);
      state.isLoading = false;
    })
    .addCase(fetchedAnimeList.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    })
    .addCase(fetchedNextAnimeList.pending, state => {
      state.error = undefined;
    })
    .addCase(fetchedNextAnimeList.fulfilled, (state, action) => {
      if (action.payload === null) {
        state.isAll = true;
        entityAdapter.addMany(state as State, []);
      } else {
        entityAdapter.addMany(state as State, action.payload);
      }
    })
    .addCase(fetchedNextAnimeList.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
    }),
});

export const { removeAnimeList } = animeSlice.actions;
