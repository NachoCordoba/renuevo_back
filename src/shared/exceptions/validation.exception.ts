import { ExceptionDTO } from "shared/dtos/exception.dto";
import { Exception } from "./exception";
import { HttpStatus } from "shared/enums/http_status.enum";

export type ValidationProps = {
  property: string;
  type: "header" | "parameter" | "pointer";
  constraint: string;
};

export class ValidationException extends Exception {
  constructor(detail: ValidationProps) {
    const validationException = new ExceptionDTO({
      title: "ValidationException",
      code: "validation_exception",
      detail: detail.constraint,
      status: HttpStatus.BAD_REQUEST,
      source: {
        [detail.type]: detail.property,
      },
    });
    super(validationException);
  }
}
