import { createAsyncThunk } from '@reduxjs/toolkit';

import { TokenService } from '../../api/services/tokenService';

import { UserService } from '../../api/services/userService';

export const fetchUser = createAsyncThunk(
  'user/fetch',
  () => UserService.fetchUser(),
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  () => {
    TokenService.remove();
  },
);
