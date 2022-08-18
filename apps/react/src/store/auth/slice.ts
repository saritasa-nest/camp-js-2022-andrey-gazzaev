import { AppError } from '@js-camp/core/models/app-error';
import { FormError } from '@js-camp/core/models/form-error';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';
import { createSlice } from '@reduxjs/toolkit';

import { loginUser, registrationUser } from './dispatchers';

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
      state.user = action.payload;
      state.isLoading = false;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload as AppError<FormError<Login>>;
      state.isLoading = false;
    })
    .addCase(registrationUser.pending, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(registrationUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    })
    .addCase(registrationUser.rejected, (state, action) => {
      state.error = action.payload as AppError<FormError<Registration>>;
      state.isLoading = false;
    }),
});
