/* eslint-disable @typescript-eslint/naming-convention */
import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user';

export namespace UserMapper {

  /**
   * Maps dto to model.
   * @param dto User dto.
   */
  export function fromDto(dto: UserDto): User {
    return new User({
      email: dto.email,
      firstName: dto.first_name,
      lastName: dto.last_name,
      avatar: dto.avatar,
    });
  }

  /**
   * Maps model to dto.
   * @param model User model.
   * @param password User password.
   */
  export function toDto(model: User, password?: string): UserDto {
    return {
      email: model.email,
      first_name: model.firstName,
      last_name: model.lastName,
      avatar: model.avatar,
      password,
    };
  }
}
