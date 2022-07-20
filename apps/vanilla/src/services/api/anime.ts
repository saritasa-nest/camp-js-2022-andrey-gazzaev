import { AnimeBaseDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeBase } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { defaultRequestInstance } from './instance';

/**
 * Request to the server to get anime.
 * @param url Request address.
 */
export async function fetchAnime(url: string): Promise<Pagination<AnimeBase>> {
  const response = await defaultRequestInstance.get<PaginationDto<AnimeBaseDto>>(url);

  return PaginationMapper.fromDto<AnimeBaseDto, AnimeBase>(
    response.data,
    animeDto => AnimeMapper.fromDto(animeDto),
  );
}
