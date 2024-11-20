export interface UserHttpPort<Request, Response> {
  handle(req: Request): Promise<Response>;
}
