import { AppError } from '@js-camp/core/models/app-error';
import { FormError } from '@js-camp/core/models/form-error';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';
import { createSlice } from '@reduxjs/toolkit';

import { loginUser, registrationUser, toggleSubmit } from './dispatchers';

import { initialState } from './state';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(loginUser.pending, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload;
      state.isLoading = false;
      state.isSubmit = true;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload as AppError<FormError<Login>>;
      state.isLoading = false;
      state.isSubmit = false;
    })
    .addCase(registrationUser.pending, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(registrationUser.fulfilled, (state, action) => {
      state.token = action.payload;
      state.isLoading = false;
      state.isSubmit = true;
    })
    .addCase(registrationUser.rejected, (state, action) => {
      state.error = action.payload as AppError<FormError<Registration>>;
      state.isLoading = false;
      state.isSubmit = false;
    })
    .addCase(toggleSubmit.fulfilled, state => {
      state.isSubmit = false;
    }),
});
