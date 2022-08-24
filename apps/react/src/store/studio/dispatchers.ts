import { Studio } from '@js-camp/core/models/studio';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { StudioService } from '../../api/services/studioService';

export const fetchStudios = createAsyncThunk(
  'studios/fetch',
  () => StudioService.fetchStudios(),
);

export const addStudios = createAsyncThunk(
  'studios/add',
  (studios: readonly Studio[]) => studios,
);
