import { IHashService } from "@/shared/interfaces/hash_service.interface";
import { MinLengthException } from "@/shared/exceptions/min_length.exception";
import { PasswordFactory } from "../password.factory";
import { Password } from "../../value_objects/password.vo";

describe("PasswordFactory", () => {
  describe("create", () => {
    it("should create a hashed Password object from a valid plain password", async () => {
      const plainPassword = "SecurePassword123";
      const hashedPassword = "hashed_password";

      // Mock del servicio de hash
      const mockHashService: IHashService = {
        hash: jest.fn().mockResolvedValue(hashedPassword),
        compare: jest.fn(),
      };

      const password = await PasswordFactory.create(
        plainPassword,
        mockHashService
      );

      expect(password).toBeInstanceOf(Password);
      expect(password.value).toBe(hashedPassword);
      expect(mockHashService.hash).toHaveBeenCalledWith(plainPassword);
    });

    it("should throw MinLengthException if the plain password is too short", async () => {
      const shortPassword = "short";

      // Mock del servicio de hash (aunque no se usará en este caso)
      const mockHashService: IHashService = {
        hash: jest.fn(),
        compare: jest.fn(),
      };

      await expect(
        PasswordFactory.create(shortPassword, mockHashService)
      ).rejects.toThrow(MinLengthException);
      await expect(
        PasswordFactory.create(shortPassword, mockHashService)
      ).rejects.toThrow(
        `Field password size must be equal to or greater than ${Password.MIN_LENGTH_PASSWORD}`
      );
    });
  });

  describe("fromPersist", () => {
    it("should create a Password object from a hashed password", () => {
      const hashedPassword = "hashed_password";

      const password = PasswordFactory.fromPersist(hashedPassword);

      expect(password).toBeInstanceOf(Password);
      expect(password.value).toBe(hashedPassword);
    });
  });
});
