import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserService } from '../../api/services/userService';

export const fetchUser = createAsyncThunk(
  'user/fetch',
  () => UserService.fetchUser(),
);
