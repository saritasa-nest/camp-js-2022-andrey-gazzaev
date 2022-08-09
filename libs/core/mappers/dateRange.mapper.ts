import { DateRangeDto } from '../dtos/dateRange.dto';
import { DateRange } from '../models/dateRange';
import { isDefined } from '../utils/guards/general.guard';

export namespace DateRangeMapper {

  /**
   * Maps dto to model.
   * @param dto Date range DTO.
   */
  export function fromDto(dto: DateRangeDto): DateRange {
    return new DateRange({
      end: isDefined(dto.end) ? new Date(dto.end) : null,
      start: isDefined(dto.start) ? new Date(dto.start) : null,
    });
  }

  /**
   * Maps model to dto.
   * @param model Date range.
   */
  export function toDto(model: DateRange): DateRangeDto {
    return {
      end: isDefined(model.end) ? model.end.toString() : null,
      start: isDefined(model.start) ? model.start.toString() : null,
    };
  }
}
