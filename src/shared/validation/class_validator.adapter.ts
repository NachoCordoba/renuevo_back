import { validate, ValidationError } from "class-validator";
import { IValidable } from "./validable.interface";
import { ExceptionManager } from "../exceptions/exception_manager";
import { ClassValidatorMapper } from "../mappers/class_validator.mapper";

export class ClassValidatorAdapter implements IValidable {
  async validate<T extends object>(dto: T): Promise<void> {
    const validations: ValidationError[] = await validate(dto, {
      whitelist: true,
    });

    if (validations.length > 0) {
      const exceptionManager = new ExceptionManager();
      validations.map((validation) => {
        exceptionManager.addExceptions(
          ClassValidatorMapper.toValidationExceptions(validation)
        );
      });
      exceptionManager.hasExceptions();
    }
  }
}
