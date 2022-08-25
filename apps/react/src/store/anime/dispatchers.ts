import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const fetchedAnimeList = createAsyncThunk(
  'anime/fetched',
  async() => {
    const animeList = await AnimeService.fetchAnimeList();
    return animeList;
  },
);

export const fetchedNextAnimeList = createAsyncThunk(
  'anime/fetchedNext',
  async() => {
    const animeList = await AnimeService.fetchNextAnimeList();
    return animeList;
  },
);
