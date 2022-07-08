import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { DateRangeDto } from '@js-camp/core/dtos/dateRange.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { DateRangeMapper } from '@js-camp/core/mappers/dateRange.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { DateRange } from '@js-camp/core/models/dateRange';
import { HttpError } from '@js-camp/core/models/httpError';
import { Pagination } from '@js-camp/core/models/pagination';

import { defaultRequestInstance } from './instance';

/**
 * Request to the server to get anime.
 * @param url Request address.
 */
export async function fetchAnime(url: string): Promise<Pagination<Anime<DateRange>>> {
  try {
    const response = await defaultRequestInstance.get<PaginationDto<AnimeDto<DateRangeDto>>>(url);

    return PaginationMapper.fromDto<AnimeDto<DateRangeDto>, Anime<DateRange>>(
      response.data,
      animeDto => AnimeMapper.fromDto(animeDto, DateRangeMapper.fromDto),
    );
  } catch (error: unknown) {

    if (error instanceof HttpError) {
      throw new HttpError(error.detail);
    }

    const UNKNOWN_ERROR = 'unexpected error';
    throw new Error(UNKNOWN_ERROR);
  }
}
