import { ValidationDTO } from "@/shared/dtos/validation.dto";
import { ValidationException } from "@/shared/exceptions/validation.exception";

export class InvalidEmailFormat extends ValidationException {
  constructor(value: string) {
    super(
      new ValidationDTO({
        message: "Invalid Email Format",
        property: "email",
        constraint: "Invalid email format",
        code: "invalid_email",
        value,
      })
    );
  }
}
