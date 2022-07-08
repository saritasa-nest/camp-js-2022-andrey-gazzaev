import { AnimeDto } from '../dtos/anime.dto';
import { Anime, Status, Type } from '../models/anime';

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   * @param mapperFromDto Callback of result mapper from DTO to Model.
   */
  export function fromDto<Dto, Model>(
    dto: AnimeDto<Dto>,
    mapperFromDto: (resultDto: Dto) => Model,
  ): Anime<Model> {
    const status = Object.values(Status).includes(dto.status as Status) ? dto.status as Status : Status.Airing;
    const type = Object.values(Type).includes(dto.type as Type) ? dto.type as Type : Type.Tv;

    return new Anime({
      id: dto.id,
      image: dto.image,
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      aired: mapperFromDto(dto.aired),
      status,
      type,
    });

  }
}
