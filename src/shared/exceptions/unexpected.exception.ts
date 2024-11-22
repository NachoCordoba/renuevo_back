import { ExceptionDTO } from "../dtos/exception.dto";
import { HttpStatus } from "../enum/http_status.enum";
import { Exception } from "./exception";

export class UnexpectedException extends Exception {
  status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
  stack?: string | undefined;
  constructor(err: Error) {
    super(
      new ExceptionDTO({
        code: "unexpected_exception",
        message: err.message,
      })
    );
    this.stack = err.stack;
  }
}
