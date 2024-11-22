import { ExceptionDTO } from "../dtos/exception.dto";
import { HttpStatus } from "../enum/http_status.enum";

export abstract class Exception extends Error {
  abstract readonly status: HttpStatus;
  public readonly code: string;
  public readonly message: string;

  constructor(exception: ExceptionDTO) {
    super(exception.message);
    this.code = exception.code;
    this.message = exception.code;
  }

  toJson() {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
