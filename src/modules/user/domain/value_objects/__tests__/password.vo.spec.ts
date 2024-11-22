import { IHashService } from "@/shared/interfaces/hash_service.interface";
import { Password } from "../password.vo";

describe("Password Value Object", () => {
  describe("hasMinimumLength", () => {
    it("should return true if the password meets the minimum length requirement", () => {
      const password = "12345678";
      expect(Password.hasMinimumLength(password)).toBe(true);
    });

    it("should return false if the password does not meet the minimum length requirement", () => {
      const password = "123";
      expect(Password.hasMinimumLength(password)).toBe(false);
    });

    it("should return true if the password meets a custom minimum length", () => {
      const password = "12345";
      expect(Password.hasMinimumLength(password, 5)).toBe(true);
    });

    it("should return false if the password does not meet a custom minimum length", () => {
      const password = "1234";
      expect(Password.hasMinimumLength(password, 5)).toBe(false);
    });
  });

  describe("compare", () => {
    it("should return true if the plain password matches the hashed password", async () => {
      const hashedPassword = "hashed_password";
      const plainPassword = "plain_password";

      // Mock del servicio de hash
      const mockHashService: IHashService = {
        hash: jest.fn(),
        compare: jest.fn().mockResolvedValue(true),
      };

      const password = new Password(hashedPassword);

      const result = await password.compare(plainPassword, mockHashService);
      expect(result).toBe(true);
      expect(mockHashService.compare).toHaveBeenCalledWith(
        plainPassword,
        hashedPassword
      );
    });

    it("should return false if the plain password does not match the hashed password", async () => {
      const hashedPassword = "hashed_password";
      const plainPassword = "wrong_password";

      // Mock del servicio de hash
      const mockHashService: IHashService = {
        hash: jest.fn(),
        compare: jest.fn().mockResolvedValue(false),
      };

      const password = new Password(hashedPassword);

      const result = await password.compare(plainPassword, mockHashService);
      expect(result).toBe(false);
      expect(mockHashService.compare).toHaveBeenCalledWith(
        plainPassword,
        hashedPassword
      );
    });
  });

  describe("value getter", () => {
    it("should return the hashed password value", () => {
      const hashedPassword = "hashed_password";
      const password = new Password(hashedPassword);

      expect(password.value).toBe(hashedPassword);
    });
  });
});
