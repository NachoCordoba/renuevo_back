import { Email } from "../email.vo";

describe("Email Value Object", () => {
  describe("isValidEmailFormat", () => {
    it("should return true for a valid email format", () => {
      const validEmail = "test@example.com";
      expect(Email.isValidEmailFormat(validEmail)).toBe(true);
    });

    it("should return false for an invalid email format (missing @)", () => {
      const invalidEmail = "testexample.com";
      expect(Email.isValidEmailFormat(invalidEmail)).toBe(false);
    });

    it("should return false for an invalid email format (missing domain)", () => {
      const invalidEmail = "test@";
      expect(Email.isValidEmailFormat(invalidEmail)).toBe(false);
    });

    it("should return false for an invalid email format (missing user part)", () => {
      const invalidEmail = "@example.com";
      expect(Email.isValidEmailFormat(invalidEmail)).toBe(false);
    });

    it("should return false for an invalid email format (invalid characters)", () => {
      const invalidEmail = "test@exa!mple.com";
      expect(Email.isValidEmailFormat(invalidEmail)).toBe(false);
    });
  });

  describe("value getter", () => {
    it("should return the email value", () => {
      const emailValue = "test@example.com";
      const email = new Email(emailValue);
      expect(email.value).toBe(emailValue);
    });

    it("should store the email as a readonly property", () => {
      const emailValue = "test@example.com";
      const email = new Email(emailValue);
      expect(() => {
        // @ts-expect-error: Attempting to mutate a readonly property
        email.value = "new@example.com";
      }).toThrow();
    });
  });
});
