import { UserFactory } from "@/user/domain/factories/user.factory";
import { IHashService } from "@/shared/interfaces/hash_service.interface";
import { UserEntity } from "@/user/domain/entities/user.entity";
import { RegisterUserCase } from "../register_user.use_case";
import { RegisteredEmailException } from "../../exceptions/registered_email.exception";
import { CreateUserDTO } from "../../dtos/create_user.dto";
import { UserDTO } from "../../dtos/user.dto";
import { UserMapper } from "../../mappers/user.mapper";

jest.mock("@/user/domain/factories/user.factory");
jest.mock("../../mappers/user.mapper");

describe("RegisterUserCase", () => {
  let mockUserRepository: {
    findByEmail: jest.Mock;
    save: jest.Mock;
  };

  let mockHashService: IHashService;

  let registerUserUseCase: RegisterUserCase;

  beforeEach(() => {
    // Mock del repositorio de usuario
    mockUserRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    };

    // Mock del servicio de hash
    mockHashService = {
      hash: jest.fn(),
      compare: jest.fn(),
    };

    // Instancia del caso de uso
    registerUserUseCase = new RegisterUserCase({
      userRepository: mockUserRepository,
      hashService: mockHashService,
    });

    // Resetear mocks
    jest.clearAllMocks();
  });

  describe("checkIfExistEmail", () => {
    it("should throw RegisteredEmailException if email already exists", async () => {
      const email = "test@example.com";

      mockUserRepository.findByEmail.mockResolvedValue({ email });

      await expect(
        registerUserUseCase.checkIfExistEmail(email)
      ).rejects.toThrow(RegisteredEmailException);

      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
    });

    it("should not throw any exception if email does not exist", async () => {
      const email = "test@example.com";

      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(
        registerUserUseCase.checkIfExistEmail(email)
      ).resolves.not.toThrow();

      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
    });
  });

  describe("execute", () => {
    it("should create a new user and return a UserDTO when email does not exist", async () => {
      const createUserDto: CreateUserDTO = {
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        password: "SecurePassword123",
      };

      const mockUserEntity: UserEntity = {
        uuid: "123e4567-e89b-12d3-a456-426614174000",
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        password: "hashed_password",
      } as any;

      const mockUserDto: UserDTO = {
        uuid: "123e4567-e89b-12d3-a456-426614174000",
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        password: "hashed_password",
      };

      mockUserRepository.findByEmail.mockResolvedValue(null);
      jest.spyOn(UserFactory, "create").mockResolvedValue(mockUserEntity);
      jest.spyOn(UserMapper, "toDTO").mockReturnValue(mockUserDto);

      const result = await registerUserUseCase.execute(createUserDto);

      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
        createUserDto.email
      );
      expect(UserFactory.create).toHaveBeenCalledWith(
        createUserDto,
        mockHashService
      );
      expect(mockUserRepository.save).toHaveBeenCalledWith(mockUserEntity);
      expect(UserMapper.toDTO).toHaveBeenCalledWith(mockUserEntity);

      expect(result).toEqual(mockUserDto);
    });

    it("should throw RegisteredEmailException if email already exists", async () => {
      const createUserDto: CreateUserDTO = {
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        password: "SecurePassword123",
      };

      mockUserRepository.findByEmail.mockResolvedValue({
        email: createUserDto.email,
      });

      await expect(registerUserUseCase.execute(createUserDto)).rejects.toThrow(
        RegisteredEmailException
      );

      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
        createUserDto.email
      );
      expect(mockUserRepository.save).not.toHaveBeenCalled();
    });
  });
});
