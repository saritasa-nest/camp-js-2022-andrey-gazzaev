import { createSlice } from '@reduxjs/toolkit';

import { fetchedUser, loggedOutUser } from './dispatchers';
import { entityAdapter, initialState, State } from './state';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchedUser.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchedUser.fulfilled, (state, action) => {
      entityAdapter.setOne(state as State, action.payload);
      state.isLoading = false;
    })
    .addCase(fetchedUser.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    })
    .addCase(loggedOutUser.pending, state => {
      state.isLoading = true;
    })
    .addCase(loggedOutUser.fulfilled, state => {
      entityAdapter.removeAll(state as State);
      state.isLoading = false;
    }),
});
