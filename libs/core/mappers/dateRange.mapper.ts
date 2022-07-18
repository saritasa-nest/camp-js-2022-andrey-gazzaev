import { DateRangeDto } from '../dtos/dateRange.dto';
import { DateRange } from '../models/dateRange';
import { isNotFalsy } from '../utils/guards/general.guard';

export namespace DateRangeMapper {

  /**
   * Maps dto to model.
   * @param dto Date range DTO.
   */
  export function fromDto(dto: DateRangeDto): DateRange {
    return new DateRange({
      end: isNotFalsy(dto.end) ? new Date(dto.end) : null,
      start: isNotFalsy(dto.start) ? new Date(dto.start) : null,
    });
  }
}
