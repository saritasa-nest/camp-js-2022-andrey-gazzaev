import { createAsyncThunk } from '@reduxjs/toolkit';

import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';

import { AuthService } from '../../api/services/authService';
import { UserService } from '../../api/services/userService';

export const loginUser = createAsyncThunk(
  'auth/login',
  async(loginData: Login, { rejectWithValue }) => {
    try {
      await AuthService.login(loginData);
      const user = await UserService.fetchUser();
      return user;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

export const registrationUser = createAsyncThunk(
  'auth/registration',
  async(registrationData: Registration, { rejectWithValue }) => {
    try {
      await AuthService.register(registrationData);
      const user = await UserService.fetchUser();
      return user;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);
