import { IHashService } from "@/shared/interfaces/hash_service.interface";
import { CreateUserDTO } from "@/user/application/dtos/create_user.dto";
import { UserEntity } from "../entities/user.entity";
import { UUIDFactory } from "@/shared/factories/uuid.factory";
import { EmailFactory } from "./email.factory";
import { PasswordFactory } from "./password.factory";
import { UserDTO } from "@/user/application/dtos/user.dto";

export class UserFactory {
  static async create(
    createUserDto: CreateUserDTO,
    hashService: IHashService
  ): Promise<UserEntity> {
    UserEntity.isValidName(createUserDto.firstName, "firstName");
    UserEntity.isValidName(createUserDto.firstName, "lastName");
    const uuid = UUIDFactory.create();
    const email = EmailFactory.create(createUserDto.email);
    const password = await PasswordFactory.create(
      createUserDto.password,
      hashService
    );

    return new UserEntity(
      uuid,
      email,
      createUserDto.firstName,
      createUserDto.lastName,
      password
    );
  }

  static fromPersist(user: UserDTO): UserEntity {
    const uuid = UUIDFactory.fromPersist(user.uuid);
    const password = PasswordFactory.fromPersist(user.password);
    const email = EmailFactory.fromPersist(user.email);
    return new UserEntity(uuid, email, user.firstName, user.lastName, password);
  }
}
