import { UserEntity } from "@/user/domain/entities/user.entity";
import { UserDTO } from "../dtos/user.dto";

export class UserMapper {
  static toDTO(userEntity: UserEntity): UserDTO {
    return new UserDTO(
      userEntity.id,
      userEntity.email,
      userEntity.firstName,
      userEntity.lastName,
      userEntity.password
    );
  }
}
