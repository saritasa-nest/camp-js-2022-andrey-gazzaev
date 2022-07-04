import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { HttpError } from '@js-camp/core/models/httpError';
import { Pagination } from '@js-camp/core/models/pagination';

import { getInstance } from './instance';

/**
 * Request to the server to get anime.
 * @param url Request address.
 */
export async function fetchAnime(url: string): Promise<Pagination<Anime> | HttpError | Error> {
  try {
    const instance = getInstance();

    const response = await instance.get<PaginationDto<AnimeDto>>(url);

    const animePaginationDto = response.data;

    return AnimeMapper.fromDto(animePaginationDto);
  } catch (error: unknown) {

    if (error instanceof HttpError) {
      const { detail } = error;
      console.warn(detail);
      return new HttpError(error.detail, error.code);
    }

    const unknownError = 'unexpected error';
    return new Error(unknownError);
  }
}
