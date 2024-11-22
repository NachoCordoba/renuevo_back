import { ValidationDTO } from "../dtos/validation.dto";
import { ValidationException } from "./validation.exception";

export class AlphabeticException extends ValidationException {
  constructor(value: string, property: string) {
    super(
      new ValidationDTO({
        code: "alphabetic_violation",
        constraint: `Field ${property} must contain only alphabetic characters`,
        property,
        message: `Field ${property} must contain only alphabetic characters`,
        value,
      })
    );
  }
}
