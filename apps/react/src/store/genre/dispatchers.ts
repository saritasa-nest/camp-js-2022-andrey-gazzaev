import { createAsyncThunk } from '@reduxjs/toolkit';

import { GenresService } from '../../api/services/genreService';

export const fetchedGenres = createAsyncThunk(
  'genres/fetched',
  () => GenresService.fetchGenres(),
);
