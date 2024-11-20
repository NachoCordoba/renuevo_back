import { HttpStatus } from "../enums/http_status.enum";
import { ExceptionDTO } from "./exception.dto";

type Data<T> = {
  type: string;
  id: string;
  attributes: Omit<T, "id">;
};

type Body<T> = {
  data: Data<T> | Array<Data<T>> | {};
  errors: Array<ExceptionDTO>;
};

interface IResponse<T> {
  statusCode: HttpStatus;
  body: Body<T>;
  headers?: Record<string, string>;
}

export class ResponseDTO<T> {
  private statusCode: HttpStatus;
  private body: Body<T>;
  private headers: Record<string, string>;

  constructor(res: IResponse<T>) {
    this.statusCode = res.statusCode;
    this.body = res.body;
    this.headers = res.headers || {};
  }

  getStatusCode(): HttpStatus {
    return this.statusCode;
  }

  getBody(): Body<T> {
    return this.body;
  }

  getBodyString(): string {
    return JSON.stringify(this.body);
  }

  getHeaders(): Record<string, string> {
    return this.headers;
  }
}
