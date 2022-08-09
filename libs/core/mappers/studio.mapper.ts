import { StudioDto } from '../dtos/studio.dto';
import { Studio } from '../models/studio.dto';

export namespace StudioMapper {

  /**
   * Maps dto to model.
   * @param dto Studio dto.
   */
  export function fromDto(dto: StudioDto): Studio {
    return new Studio({
      id: dto.id,
      name: dto.name,
    });
  }

  /**
   * Maps model to dto.
   * @param model Studio.
   */
  export function toDto(model: Studio): StudioDto {
    return {
      id: model.id,
      name: model.name,
    };
  }
}
