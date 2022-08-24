import { createAsyncThunk } from '@reduxjs/toolkit';

import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';

import { AuthService } from '../../api/services/authService';

export const loginUser = createAsyncThunk(
  'auth/login',
  async(loginData: Login, { rejectWithValue }) => {
    try {
      return await AuthService.login(loginData);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

export const registrationUser = createAsyncThunk(
  'auth/registration',
  async(registrationData: Registration, { rejectWithValue }) => {
    try {
      return await AuthService.register(registrationData);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);
