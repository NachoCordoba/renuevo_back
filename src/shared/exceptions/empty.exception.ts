import { ValidationDTO } from "../dtos/validation.dto";
import { ValidationException } from "./validation.exception";

export class EmptyException extends ValidationException {
  constructor(value: string, property: string) {
    super(
      new ValidationDTO({
        code: "empty_violation",
        constraint: `Field ${property} cannot be empty`,
        property,
        message: `Field ${property} cannot be empty`,
        value,
      })
    );
  }
}
