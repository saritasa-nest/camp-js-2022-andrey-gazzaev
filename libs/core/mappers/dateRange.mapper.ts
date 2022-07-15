import { DateRangeDto } from '../dtos/dateRange.dto';
import { DateRange } from '../models/dateRange';

export namespace DateRangeMapper {

  /**
   * Maps dto to model.
   * @param dto Date range DTO.
   */
  export function fromDto(dto: DateRangeDto): DateRange {
    return new DateRange({
      end: dto.end !== null ? new Date(dto.end) : null,
      start: dto.start !== null ? new Date(dto.start) : null,
    });
  }
}
