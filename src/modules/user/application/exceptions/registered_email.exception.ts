import { ValidationDTO } from "@/shared/dtos/validation.dto";
import { ValidationException } from "@/shared/exceptions/validation.exception";

export class RegisteredEmailException extends ValidationException {
  constructor(email: string) {
    super(
      new ValidationDTO({
        code: "email_already_registered",
        message: "The email is already registered",
        property: "email",
        constraint: "The email is already registered",
        value: email,
      })
    );
  }
}
