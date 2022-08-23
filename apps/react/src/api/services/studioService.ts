import { Studio } from '@js-camp/core/models/studio.dto';
import { StudioDto } from '@js-camp/core/dtos/studio.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { StudioMapper } from '@js-camp/core/mappers/studio.mapper';

import { CONFIG } from '../config';
import { http } from '..';

export namespace StudioService {
  const studioUrl = new URL('anime/studio/', CONFIG.apiUrl);

  /** Fetches a list of studios. */
  export async function fetchStudios(): Promise<readonly Studio[]> {
    const { data } = await http.get<PaginationDto<StudioDto>>(studioUrl.toString());
    return data.results.map(dto => StudioMapper.fromDto(dto));
  }
}
