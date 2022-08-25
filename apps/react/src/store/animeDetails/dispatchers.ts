import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';
import { addedGenres } from '../genre/slice';
import { addedStudios } from '../studio/slice';

export const fetchAnimeDetailsById = createAsyncThunk(
  'animeDetails/fetchedId',
  async(id: number, { dispatch }) => {
    const anime = await AnimeService.fetchAnimeById(id);
    if (anime !== null) {
      dispatch(addedGenres(anime.genresData));
      dispatch(addedStudios(anime.studiosData));
    }
    return anime;
  },
);
