import { HttpStatus } from "../enum/http_status.enum";
import { ExceptionDTO } from "./exception.dto";

type Exception = ExceptionDTO;

type Errors = Array<Exception>;

type Data<Attributes> = {
  id: string;
  attributes: Attributes;
  type: string;
};

type Body<Attributes> = {
  data: Data<Attributes> | Array<Data<Attributes>> | {};
  errors: Errors;
};

export class ResponseDTO<Attributes> {
  private status: HttpStatus;
  private body: Body<Attributes>;

  constructor() {
    this.body = {
      data: {},
      errors: [],
    };
    this.status = HttpStatus.ACCEPTED;
  }

  setData(
    data: Data<Attributes> | Array<Data<Attributes>>
  ): ResponseDTO<Attributes> {
    this.body.data = data;
    return this;
  }

  setErrors(errors: Errors): ResponseDTO<Attributes> {
    this.body.errors = errors;
    return this;
  }

  setStatus(status: HttpStatus): ResponseDTO<Attributes> {
    this.status = status;
    return this;
  }

  addError(error: Exception): ResponseDTO<Attributes> {
    this.body.errors.push(error);
    return this;
  }
}
