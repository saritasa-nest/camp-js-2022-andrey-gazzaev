import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const fetchAnimeList = createAsyncThunk(
  'anime/fetch',
  () => AnimeService.fetchAnimeList(),
);

export const fetchNextAnimeList = createAsyncThunk(
  'anime/fetch/next',
  () => AnimeService.fetchNextAnimeList(),
);
