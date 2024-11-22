import { UUIDFactory } from "@/shared/factories/uuid.factory";
import { CreateUserDTO } from "@/user/application/dtos/create_user.dto";
import { UserDTO } from "@/user/application/dtos/user.dto";
import { IHashService } from "@/shared/interfaces/hash_service.interface";
import { EmailFactory } from "../email.factory";
import { PasswordFactory } from "../password.factory";
import { UserFactory } from "../user.factory";
import { UserEntity } from "../../entities/user.entity";

jest.mock("../email.factory");
jest.mock("../password.factory");
jest.mock("@/shared/factories/uuid.factory");

describe("UserFactory", () => {
  describe("create", () => {
    it("should create a valid UserEntity from a CreateUserDTO", async () => {
      const mockUUID = { value: "123e4567-e89b-12d3-a456-426614174000" };
      const mockEmail = { value: "test@example.com" };
      const mockPassword = { value: "hashed_password" };

      const mockHashService: IHashService = {
        hash: jest.fn(),
        compare: jest.fn(),
      };

      // Mocks de Factories
      jest.spyOn(UUIDFactory, "create").mockReturnValue(mockUUID as any);
      jest.spyOn(EmailFactory, "create").mockReturnValue(mockEmail as any);
      jest
        .spyOn(PasswordFactory, "create")
        .mockResolvedValue(mockPassword as any);

      const createUserDto: CreateUserDTO = {
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        password: "SecurePassword123",
      };

      const userEntity = await UserFactory.create(
        createUserDto,
        mockHashService
      );

      expect(userEntity).toBeInstanceOf(UserEntity);
      expect(userEntity.uuid).toBe(mockUUID.value);
      expect(userEntity.email).toBe(mockEmail.value);
      expect(userEntity.firstName).toBe(createUserDto.firstName);
      expect(userEntity.lastName).toBe(createUserDto.lastName);
      expect(userEntity.password).toBe(mockPassword.value);

      // Verificamos que los métodos de los factories fueron llamados
      expect(UUIDFactory.create).toHaveBeenCalled();
      expect(EmailFactory.create).toHaveBeenCalledWith(createUserDto.email);
      expect(PasswordFactory.create).toHaveBeenCalledWith(
        createUserDto.password,
        mockHashService
      );
    });
  });

  describe("fromPersist", () => {
    it("should create a valid UserEntity from a UserDTO", () => {
      const mockUUID = { value: "123e4567-e89b-12d3-a456-426614174000" };
      const mockEmail = { value: "test@example.com" };
      const mockPassword = { value: "hashed_password" };

      // Mocks de Factories
      jest.spyOn(UUIDFactory, "fromPersist").mockReturnValue(mockUUID as any);
      jest.spyOn(EmailFactory, "fromPersist").mockReturnValue(mockEmail as any);
      jest
        .spyOn(PasswordFactory, "fromPersist")
        .mockReturnValue(mockPassword as any);

      const userDto: UserDTO = {
        uuid: "123e4567-e89b-12d3-a456-426614174000",
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        password: "hashed_password",
      };

      const userEntity = UserFactory.fromPersist(userDto);

      expect(userEntity).toBeInstanceOf(UserEntity);
      expect(userEntity.uuid).toBe(mockUUID.value);
      expect(userEntity.email).toBe(mockEmail.value);
      expect(userEntity.firstName).toBe(userDto.firstName);
      expect(userEntity.lastName).toBe(userDto.lastName);
      expect(userEntity.password).toBe(mockPassword.value);

      // Verificamos que los métodos de los factories fueron llamados
      expect(UUIDFactory.fromPersist).toHaveBeenCalledWith(userDto.uuid);
      expect(EmailFactory.fromPersist).toHaveBeenCalledWith(userDto.email);
      expect(PasswordFactory.fromPersist).toHaveBeenCalledWith(
        userDto.password
      );
    });
  });
});
