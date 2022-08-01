import { AnimeDetailsDto } from '@js-camp/core/dtos/anime-details';
import { AnimeBaseDto } from '@js-camp/core/dtos/anime.dto';
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
  const { data } = await defaultRequestInstance.get<PaginationDto<AnimeBaseDto>>(url);

  return PaginationMapper.fromDto<AnimeBaseDto, AnimeBase>(
    data,
    animeDto => AnimeMapper.fromDto(animeDto),
  );
}

/**
 * Request to the server to get anime by ID.
 * @param id ID of anime.
 */
export async function fetchAnimeById(id: number): Promise<AnimeDetails> {
  const url = `/anime/anime/${id}/`;
  const { data } = await defaultRequestInstance.get<AnimeDetailsDto>(url);

  return AnimeMapper.fromDetailsDto(data);
}
