import { map, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Studio } from '@js-camp/core/models/studio.dto';
import { StudioDto } from '@js-camp/core/dtos/studio.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { StudioMapper } from '@js-camp/core/mappers/studio.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { AppConfigService } from './app-config.service';

/** Studio service. */
@Injectable({
  providedIn: 'root',
})
export class StudioService {

  private readonly studiosUrl: URL;

  public constructor(
    config: AppConfigService,
    private readonly http: HttpClient,
  ) {
    this.studiosUrl = new URL(`anime/studios/`, config.apiCampBaseUrl);
  }

  /** Gets studios.  */
  public fetchStudios(): Observable<readonly Studio[]> {
    return this.http.get<PaginationDto<StudioDto>>(
      this.studiosUrl.toString(),
    ).pipe(
      map(pagination => PaginationMapper.fromDto<StudioDto, Studio>(
        pagination,
        studioDto => StudioMapper.fromDto(studioDto),
      )),
      map(studios => studios.results),
    );
  }
}
