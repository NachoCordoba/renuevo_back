interface IRequest<T> {
  path: string;
  method: string;
  headers: Record<string, string | undefined>;
  body: string | T | null;
  queryParams: Record<string, string | undefined> | null;
  pathParams: Record<string, string | undefined> | null;
}

export class RequestDTO<T> {
  private path: string;
  private method: string;
  private headers: Record<string, string | undefined>;
  private body: T;
  private queryParams: Record<string, string | undefined>;
  private pathParams: Record<string, string | undefined>;

  constructor(req: IRequest<T>) {
    this.path = req.path;
    this.method = req.method;
    this.headers = req.headers;
    this.body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    this.queryParams = req.queryParams || {};
    this.pathParams = req.pathParams || {};
  }

  getPath(): string {
    return this.path;
  }

  getMethod(): string {
    return this.method;
  }

  getHeaders(): Record<string, string | undefined> {
    return this.headers;
  }

  getBody(): T {
    return this.body;
  }

  getQueryParams(): Record<string, string | undefined> {
    return this.queryParams;
  }

  getPathParams(): Record<string, string | undefined> {
    return this.pathParams;
  }
}
