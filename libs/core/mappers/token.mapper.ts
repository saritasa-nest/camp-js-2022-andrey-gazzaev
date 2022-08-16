import { TokenDto } from '../dtos/token.dto';
import { Token } from '../models/token';

export namespace TokensMapper {

  /**
   * Maps dto to model.
   * @param dto Tokens dto.
   */
  export function fromDto(dto: TokenDto): Token {
    return new Token({
      refresh: dto.refresh,
      access: dto.access,
    });
  }
}
