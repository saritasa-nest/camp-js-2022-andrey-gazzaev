import { createAsyncThunk } from '@reduxjs/toolkit';

import { TokenService } from '../../api/services/tokenService';

import { UserService } from '../../api/services/userService';

export const fetchedUser = createAsyncThunk(
  'user/fetched',
  () => UserService.fetchUser(),
);

export const loggedOutUser = createAsyncThunk(
  'user/loggedOut',
  () => {
    TokenService.remove();
  },
);
