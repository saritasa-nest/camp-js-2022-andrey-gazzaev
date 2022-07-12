import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { defaultRequestInstance } from './instance';

/**
 * Request to the server to get anime.
 * @param url Request address.
 */
export async function fetchAnime(url: string): Promise<Pagination<Anime>> {
  const response = await defaultRequestInstance.get<PaginationDto<AnimeDto>>(url);

  return PaginationMapper.fromDto<AnimeDto, Anime>(
    response.data,
    animeDto => AnimeMapper.fromDto(animeDto),
  );
}

/**
 * Request to the server to get anime by id.
 * @param id ID of anime.
 */
export async function fetchAnimeById(id: number): Promise<Anime> {
  const url = `/anime/anime/${id}/`;
  const response = await defaultRequestInstance.get<AnimeDto>(url);

  return AnimeMapper.fromDto(response.data);
}
