import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeListQueryParams } from '@js-camp/core/models/anime-list-query-params';

import { AnimeService } from '../../api/services/animeService';

export const fetchedAnimeList = createAsyncThunk(
  'anime/fetched',
  async(animeListQueryParams: AnimeListQueryParams) => {
    const animeList = await AnimeService.fetchAnimeList(animeListQueryParams);
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
