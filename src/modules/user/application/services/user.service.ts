import { UserRepositoryPort } from "@/user/infrastructure/ports/user_repository.port";
import { EmailAlreadyUsedException } from "../exceptions/email_already_used.exception";
import { UserDTO } from "../dtos/user.dto";
import { RegisterUserDTO } from "../dtos/register_user.dto";
import { UUID } from "@/shared/value_objects/uuid.vo";
import { UserMapper } from "../mappers/user.mapper";

interface UserServiceDependencies {
  userRepository: UserRepositoryPort;
}

export class UserService {
  constructor(private _dependencies: UserServiceDependencies) {}

  async verifyEmailAlreadyExist(email: string): Promise<void> {
    const findEmailResult = await this._dependencies.userRepository.findByEmail(
      email
    );
    if (findEmailResult) throw new EmailAlreadyUsedException();
  }

  async register(newUser: RegisterUserDTO): Promise<UserDTO> {
    await this.verifyEmailAlreadyExist(newUser.email);
    const newId = UUID.generate();
    const userEntity = UserMapper.toEntity({
      id: newId.getId(),
      ...newUser,
    });
    const userDto = UserMapper.toDTO(userEntity);
    await this._dependencies.userRepository.save(userDto);
    return userDto;
  }
}
