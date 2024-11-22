import argon from "argon2";
import { ArgonHashService } from "../argon_hash.service";

jest.mock("argon2");

describe("ArgonHashService", () => {
  let hashService: ArgonHashService;

  beforeEach(() => {
    hashService = new ArgonHashService();
    jest.clearAllMocks();
  });

  describe("hash", () => {
    it("should hash a value using Argon2", async () => {
      const plainValue = "securePassword123";
      const hashedValue = "hashedPassword";
      (argon.hash as jest.Mock).mockResolvedValue(hashedValue);
      const result = await hashService.hash(plainValue);
      expect(argon.hash).toHaveBeenCalledWith(plainValue);
      expect(result).toBe(hashedValue);
    });

    it("should throw an error if Argon2 hashing fails", async () => {
      const plainValue = "securePassword123";
      (argon.hash as jest.Mock).mockRejectedValue(new Error("Hashing failed"));
      await expect(hashService.hash(plainValue)).rejects.toThrow(
        "Hashing failed"
      );
      expect(argon.hash).toHaveBeenCalledWith(plainValue);
    });
  });

  describe("compare", () => {
    it("should return true if the value matches the hashed value", async () => {
      const plainValue = "securePassword123";
      const hashedValue = "hashedPassword";
      (argon.verify as jest.Mock).mockResolvedValue(true);
      const result = await hashService.compare(plainValue, hashedValue);
      expect(argon.verify).toHaveBeenCalledWith(hashedValue, plainValue);
      expect(result).toBe(true);
    });

    it("should return false if the value does not match the hashed value", async () => {
      const plainValue = "securePassword123";
      const hashedValue = "hashedPassword";
      (argon.verify as jest.Mock).mockResolvedValue(false);
      const result = await hashService.compare(plainValue, hashedValue);
      expect(argon.verify).toHaveBeenCalledWith(hashedValue, plainValue);
      expect(result).toBe(false);
    });

    it("should throw an error if Argon2 verification fails", async () => {
      const plainValue = "securePassword123";
      const hashedValue = "hashedPassword";
      (argon.verify as jest.Mock).mockRejectedValue(
        new Error("Verification failed")
      );
      await expect(
        hashService.compare(plainValue, hashedValue)
      ).rejects.toThrow("Verification failed");
      expect(argon.verify).toHaveBeenCalledWith(hashedValue, plainValue);
    });
  });
});
