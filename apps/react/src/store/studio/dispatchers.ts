import { createAsyncThunk } from '@reduxjs/toolkit';

import { StudioService } from '../../api/services/studioService';

export const fetchedStudios = createAsyncThunk(
  'studios/fetched',
  () => StudioService.fetchStudios(),
);
