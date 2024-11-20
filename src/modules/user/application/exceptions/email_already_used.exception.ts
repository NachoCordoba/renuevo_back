import { ExceptionDTO } from "@/shared/dtos/exception.dto";
import { HttpStatus } from "@/shared/enums/http_status.enum";
import { Exception } from "@/shared/exceptions/exception";

export class EmailAlreadyUsedException extends Exception {
  constructor() {
    const emailException = new ExceptionDTO({
      title: "Email Already Used",
      code: "email_already_used",
      detail: "The email address you are using has already been taken",
      status: HttpStatus.BAD_REQUEST,
      source: {
        pointer: "email",
      },
    });
    super(emailException);
  }
}
