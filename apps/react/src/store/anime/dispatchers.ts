import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const fetchAnimeList = createAsyncThunk(
  'anime/fetch',
  async() => {
    const animeList = await AnimeService.fetchAnimeList();
    return animeList;
  },
);

export const fetchNextAnimeList = createAsyncThunk(
  'anime/fetch/next',
  async() => {
    const animeList = await AnimeService.fetchNextAnimeList();
    return animeList;
  },
);
