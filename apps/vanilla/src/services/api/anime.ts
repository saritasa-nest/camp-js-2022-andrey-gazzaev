import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeDetailsDto } from '@js-camp/core/dtos/animeDetails';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeBase } from '@js-camp/core/models/anime';
import { AnimeDetails } from '@js-camp/core/models/animeDetails';
import { Pagination } from '@js-camp/core/models/pagination';

import { defaultRequestInstance } from './instance';

/**
 * Request to the server to get anime.
 * @param url Request address.
 */
export async function fetchAnime(url: string): Promise<Pagination<AnimeBase>> {
  const response = await defaultRequestInstance.get<PaginationDto<AnimeDto>>(url);

  return PaginationMapper.fromDto<AnimeDto, AnimeBase>(
    response.data,
    animeDto => AnimeMapper.fromDto(animeDto),
  );
}

/**
 * Request to the server to get anime by id.
 * @param id ID of anime.
 */
export async function fetchAnimeById(id: number): Promise<AnimeDetails> {
  const url = `/anime/anime/${id}/`;
  const response = await defaultRequestInstance.get<AnimeDetailsDto>(url);

  return AnimeMapper.fromDetailsDto(response.data);
}
