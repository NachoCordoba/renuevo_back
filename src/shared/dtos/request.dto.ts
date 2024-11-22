import { EmptyException } from "../exceptions/empty.exception";

export type IRequest<T> = {
  body: T;
};
export class RequestDTO<T> {
  private readonly body: T;

  constructor(req: IRequest<T>) {
    this.body = req.body;
  }

  validateEmptyBody(): RequestDTO<T> {
    if (!this.body) throw new EmptyException("", "body");
    return this;
  }

  getBody(): T {
    return this.body;
  }

  static fromLambdaEvent<T>(event: IRequest<T>): RequestDTO<T> {
    return new RequestDTO(event);
  }
}
