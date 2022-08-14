import { Studio } from '../models/studio.dto';
import { PostStudioDto, StudioDto } from '../dtos/studio.dto';

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
   * @param name Studio name.
   */
  export function toDto(name: string): PostStudioDto {
    return {
      name,
    };
  }
}
