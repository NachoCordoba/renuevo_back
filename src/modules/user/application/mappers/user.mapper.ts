import { UserEntity } from "@/user/domain/entities/user.entities";
import { UserDTO } from "../dtos/user.dto";
import { UUID } from "@/shared/value_objects/uuid.vo";

export class UserMapper {
  static toDTO(userEntity: UserEntity): UserDTO {
    return new UserDTO(
      userEntity.getId(),
      userEntity.getEmail(),
      userEntity.getPassword(),
      userEntity.getFirstName(),
      userEntity.getLastName()
    );
  }

  static toEntity(userDto: UserDTO): UserEntity {
    return new UserEntity(
      new UUID(userDto.id),
      userDto.email,
      userDto.password,
      userDto.first_name,
      userDto.last_name
    );
  }
}
