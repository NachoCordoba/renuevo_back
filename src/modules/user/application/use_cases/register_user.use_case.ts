import { IUseCase } from "@/shared/interfaces/use_case.interface";
import { CreateUserDTO } from "../dtos/create_user.dto";
import { UserDTO } from "../dtos/user.dto";
import { FindUserByEmailPort } from "@/user/infrastructure/ports/find_user_by_email.port";
import { SaveUserPort } from "@/user/infrastructure/ports/save_user.port";
import { RegisteredEmailException } from "../exceptions/registered_email.exception";
import { IHashService } from "@/shared/interfaces/hash_service.interface";
import { UserFactory } from "@/user/domain/factories/user.factory";
import { UserMapper } from "../mappers/user.mapper";

interface RegisterUserDependencies {
  userRepository: FindUserByEmailPort & SaveUserPort;
  hashService: IHashService;
}

export class RegisterUserCase implements IUseCase<CreateUserDTO, UserDTO> {
  constructor(private readonly _dependencies: RegisterUserDependencies) {}

  async checkIfExistEmail(email: string): Promise<void> {
    const emailAlreadyExist =
      await this._dependencies.userRepository.findByEmail(email);
    if (emailAlreadyExist) throw new RegisteredEmailException(email);
  }

  async execute(input: CreateUserDTO): Promise<UserDTO> {
    await this.checkIfExistEmail(input.email);
    const userEntity = await UserFactory.create(
      input,
      this._dependencies.hashService
    );
    await this._dependencies.userRepository.save(userEntity);
    return UserMapper.toDTO(userEntity);
  }
}
