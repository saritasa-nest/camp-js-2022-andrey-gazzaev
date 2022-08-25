import { createSlice } from '@reduxjs/toolkit';

import { fetchedStudios } from './dispatchers';
import { entityAdapter, initialState, State } from './state';

export const studiosSlice = createSlice({
  name: 'studios',
  initialState,
  reducers: {
    addedStudios(state, action) {
      entityAdapter.addMany(state as State, action.payload);
    },
  },
  extraReducers: builder => builder
    .addCase(fetchedStudios.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchedStudios.fulfilled, (state, action) => {
      entityAdapter.setAll(state as State, action.payload);
      state.isLoading = false;
    })
    .addCase(fetchedStudios.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    }),
});

export const { addedStudios } = studiosSlice.actions;
