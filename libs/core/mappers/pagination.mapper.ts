import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';

export namespace PaginationMapper {

  /**
   * Maps dto to model.
   * @param dto Pagination DTO.
   * @param mapperFromDto Callback of result mapper from DTO to Model.
   */
  export function fromDto<Dto, Model>(
    dto: PaginationDto<Dto>,
    mapperFromDto: (resultDto: Dto) => Model,
  ): Pagination<Model> {

    const results = dto.results.map(result => {
      try {
         return mapperFromDto(result);
      } catch {
        return null;
      }
    }).filter((result): result is Model => result !== null);

    return new Pagination<Model>({
      count: dto.count,
      next: dto.next,
      previous: dto.previous,
      results,
    });
  }
}
