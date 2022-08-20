import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeListQueryParams } from '@js-camp/core/models/anime-list-query-params';

import { AnimeService } from '../../api/services/animeService';

export const fetchAnimeList = createAsyncThunk(
  'anime/fetch',
  async(animeListQueryParams: AnimeListQueryParams) => {
    const animeList = await AnimeService.fetchAnimeList(animeListQueryParams);
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

export const removeAnimeList = createAsyncThunk(
  'anime/remove',
  () => null,
);
