import { DateRangeDto } from '../dtos/dateRange.dto';
import { DateRange } from '../models/dateRange';

export namespace DateRangeMapper {

  /**
   * Maps dto to model.
   * @param dto Date range dto.
   */
  export function fromDto(dto: DateRangeDto): DateRange {
    return new DateRange({
      end: new Date(dto.end),
      start: new Date(dto.start),
    });
  }
}
