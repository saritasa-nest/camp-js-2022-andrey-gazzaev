import { createSlice } from '@reduxjs/toolkit';

import { fetchUser, logoutUser } from './dispatchers';
import { entityAdapter, initialState, State } from './state';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchUser.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      entityAdapter.setOne(state as State, action.payload);
      state.isLoading = false;
    })
    .addCase(fetchUser.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    })
    .addCase(logoutUser.pending, state => {
      state.isLoading = true;
    })
    .addCase(logoutUser.fulfilled, state => {
      entityAdapter.removeAll(state as State);
      state.isLoading = false;
    }),
});
