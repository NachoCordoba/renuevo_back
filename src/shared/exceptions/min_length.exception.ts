import { ValidationDTO } from "@/shared/dtos/validation.dto";
import { ValidationException } from "@/shared/exceptions/validation.exception";

export class MinLengthException extends ValidationException {
  constructor(value: string, property: string, minLength: number) {
    super(
      new ValidationDTO({
        code: "min_length_violation",
        constraint: `Field ${property} size must be equal to or greater than ${minLength}`,
        property,
        message: `Field ${property} size must be equal to or greater than ${minLength}`,
        value,
      })
    );
  }
}
