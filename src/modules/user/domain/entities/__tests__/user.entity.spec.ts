import { EmptyException } from "@/shared/exceptions/empty.exception";
import { MaxLengthException } from "@/shared/exceptions/max_length.exception";
import { AlphabeticException } from "@/shared/exceptions/alphabetic.exception";
import { UserEntity } from "../user.entity";
import { UUIDFactory } from "@/shared/factories/uuid.factory";
import { EmailFactory } from "../../factories/email.factory";
import { PasswordFactory } from "../../factories/password.factory";
import { IHashService } from "@/shared/interfaces/hash_service.interface";

describe("UserEntity", () => {
  describe("isValidName", () => {
    it("should throw EmptyException if the name is empty or blank", () => {
      expect(() => UserEntity.isValidName("", "firstName")).toThrow(
        EmptyException
      );
      expect(() => UserEntity.isValidName("   ", "firstName")).toThrow(
        EmptyException
      );
    });

    it("should throw MaxLengthException if the name exceeds the maximum length", () => {
      const longName = "a".repeat(51); // 51 caracteres
      expect(() => UserEntity.isValidName(longName, "firstName")).toThrow(
        MaxLengthException
      );
    });

    it("should throw AlphabeticException if the name contains non-alphabetic characters", () => {
      const invalidName = "John123";
      expect(() => UserEntity.isValidName(invalidName, "firstName")).toThrow(
        AlphabeticException
      );
    });

    it("should not throw any exception for a valid name", () => {
      const validName = "John";
      expect(() =>
        UserEntity.isValidName(validName, "firstName")
      ).not.toThrow();
    });
  });

  describe("Entity Creation", () => {
    it("should create a UserEntity with valid data", () => {
      const uuid = UUIDFactory.create();
      const email = EmailFactory.fromPersist("test@example.com");
      const password = PasswordFactory.fromPersist("hashed_password");
      const firstName = "John";
      const lastName = "Doe";

      const user = new UserEntity(uuid, email, firstName, lastName, password);

      expect(user.uuid).toBe(uuid.value);
      expect(user.email).toBe(email.value);
      expect(user.firstName).toBe(firstName);
      expect(user.lastName).toBe(lastName);
      expect(user.password).toBe(password.value);
    });
  });

  describe("comparePassword", () => {
    it("should return true if the plain password matches the hashed password", async () => {
      const uuid = UUIDFactory.create();
      const email = EmailFactory.fromPersist("test@example.com");
      const password = PasswordFactory.fromPersist("hashed_password");
      const user = new UserEntity(uuid, email, "John", "Doe", password);

      // Mock del servicio de hash
      const mockHashService: IHashService = {
        hash: jest.fn(),
        compare: jest.fn().mockResolvedValue(true),
      };

      const result = await user.comparePassword(
        "plain_password",
        mockHashService
      );
      expect(result).toBe(true);
      expect(mockHashService.compare).toHaveBeenCalledWith(
        "plain_password",
        password.value
      );
    });

    it("should return false if the plain password does not match the hashed password", async () => {
      const uuid = UUIDFactory.create();
      const email = EmailFactory.fromPersist("test@example.com");
      const password = PasswordFactory.fromPersist("hashed_password");
      const user = new UserEntity(uuid, email, "John", "Doe", password);

      // Mock del servicio de hash
      const mockHashService: IHashService = {
        hash: jest.fn(),
        compare: jest.fn().mockResolvedValue(false),
      };

      const result = await user.comparePassword(
        "wrong_password",
        mockHashService
      );
      expect(result).toBe(false);
      expect(mockHashService.compare).toHaveBeenCalledWith(
        "wrong_password",
        password.value
      );
    });
  });

  describe("Getters", () => {
    it("should return the correct UUID", () => {
      const uuid = UUIDFactory.create();
      const email = EmailFactory.fromPersist("test@example.com");
      const password = PasswordFactory.fromPersist("hashed_password");
      const user = new UserEntity(uuid, email, "John", "Doe", password);

      expect(user.uuid).toBe(uuid.value);
    });

    it("should return the correct email", () => {
      const uuid = UUIDFactory.create();
      const email = EmailFactory.fromPersist("test@example.com");
      const password = PasswordFactory.fromPersist("hashed_password");
      const user = new UserEntity(uuid, email, "John", "Doe", password);

      expect(user.email).toBe(email.value);
    });

    it("should return the correct first name", () => {
      const uuid = UUIDFactory.create();
      const email = EmailFactory.fromPersist("test@example.com");
      const password = PasswordFactory.fromPersist("hashed_password");
      const user = new UserEntity(uuid, email, "John", "Doe", password);

      expect(user.firstName).toBe("John");
    });

    it("should return the correct last name", () => {
      const uuid = UUIDFactory.create();
      const email = EmailFactory.fromPersist("test@example.com");
      const password = PasswordFactory.fromPersist("hashed_password");
      const user = new UserEntity(uuid, email, "John", "Doe", password);

      expect(user.lastName).toBe("Doe");
    });

    it("should return the correct hashed password", () => {
      const uuid = UUIDFactory.create();
      const email = EmailFactory.fromPersist("test@example.com");
      const password = PasswordFactory.fromPersist("hashed_password");
      const user = new UserEntity(uuid, email, "John", "Doe", password);

      expect(user.password).toBe(password.value);
    });
  });
});
