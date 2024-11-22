import { ValidationDTO } from "@/shared/dtos/validation.dto";
import { ValidationException } from "@/shared/exceptions/validation.exception";

export class MaxLengthException extends ValidationException {
  constructor(value: string, property: string, maxLength: number) {
    super(
      new ValidationDTO({
        code: "max_length_violation",
        constraint: `Field ${property} size must be less or equal than ${maxLength}`,
        property,
        message: `Field ${property} size must be less or equal than ${maxLength}`,
        value,
      })
    );
  }
}
