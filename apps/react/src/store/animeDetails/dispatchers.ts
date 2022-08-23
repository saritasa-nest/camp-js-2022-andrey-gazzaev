import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';
import { addGenres } from '../genre/dispatchers';
import { addStudios } from '../studio/dispatchers';

export const fetchAnimeDetailsById = createAsyncThunk(
  'animeDetails/fetch/id',
  async(id: number, { dispatch }) => {
    const anime = await AnimeService.fetchAnimeById(id);
    if (anime !== null) {
      dispatch(addGenres(anime.genresData));
      dispatch(addStudios(anime.studiosData));
    }
    return anime;
  },
);
