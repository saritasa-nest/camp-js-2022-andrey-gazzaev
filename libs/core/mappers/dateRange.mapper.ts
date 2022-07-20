import { DateRangeDto } from '../dtos/dateRange.dto';
import { DateRange } from '../models/dateRange';
import { isDefine } from '../utils/guards/general.guard';

export namespace DateRangeMapper {

  /**
   * Maps dto to model.
   * @param dto Date range DTO.
   */
  export function fromDto(dto: DateRangeDto): DateRange {
    return new DateRange({
      end: isDefine(dto.end) ? new Date(dto.end) : null,
      start: isDefine(dto.start) ? new Date(dto.start) : null,
    });
  }
}
