import { InvalidEmailFormat } from "../../exceptions/invalid_email_format.exception";
import { Email } from "../../value_objects/email.vo";
import { EmailFactory } from "../email.factory";

describe("EmailFactory", () => {
  describe("create", () => {
    it("should create a valid Email object", () => {
      const validEmail = "test@example.com";
      const email = EmailFactory.create(validEmail);
      expect(email).toBeInstanceOf(Email);
      expect(email.value).toBe(validEmail);
    });

    it("should throw InvalidEmailFormat exception for an invalid email", () => {
      const invalidEmail = "invalid-email";
      expect(() => EmailFactory.create(invalidEmail)).toThrow(
        InvalidEmailFormat
      );
    });
  });

  describe("fromPersist", () => {
    it("should create an Email object without validating the format", () => {
      const invalidEmail = "invalid-email";
      const email = EmailFactory.fromPersist(invalidEmail);
      expect(email).toBeInstanceOf(Email);
      expect(email.value).toBe(invalidEmail);
    });

    it("should create a valid Email object when called with a valid email", () => {
      const validEmail = "test@example.com";
      const email = EmailFactory.fromPersist(validEmail);
      expect(email).toBeInstanceOf(Email);
      expect(email.value).toBe(validEmail);
    });
  });
});
