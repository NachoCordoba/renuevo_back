import { ValidationError } from "class-validator";
import { ValidationException } from "../exceptions/validation.exception";

export class ClassValidatorMapper {
  static toValidationExceptions(error: ValidationError): ValidationException[] {
    const exceptions: ValidationException[] = [];

    if (error.constraints) {
      for (const [constraintKey, constraintMessage] of Object.entries(
        error.constraints
      )) {
        exceptions.push(
          new ValidationException({
            property: error.property,
            type: "pointer",
            constraint: constraintMessage,
          })
        );
      }
    }
    if (error.children && error.children.length > 0) {
      error.children.forEach((childError) => {
        exceptions.push(...this.toValidationExceptions(childError));
      });
    }

    return exceptions;
  }
}
