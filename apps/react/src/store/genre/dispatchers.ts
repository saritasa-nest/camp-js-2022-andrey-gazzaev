import { Genre } from '@js-camp/core/models/genre';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { GenresService } from '../../api/services/genreService';

export const fetchGenres = createAsyncThunk(
  'genres/fetch',
  () => GenresService.fetchGenres(),
);

export const addGenres = createAsyncThunk(
  'genres/add',
  (genres: readonly Genre[]) => genres,
);
