import { HttpStatus } from "../enums/http_status.enum";
import { Exception } from "./exception";

export class ExceptionManager {
  private _exceptions: Array<Exception>;

  constructor(exceptions: Array<Exception> = []) {
    this._exceptions = exceptions;
  }

  addException(exception: Exception): void {
    this._exceptions.push(exception);
  }

  addExceptions(exceptions: Exception[]): void {
    exceptions.forEach((exception) => this._exceptions.push(exception));
  }

  getExceptions(): Array<Exception> {
    return this._exceptions;
  }

  hasExceptions(): void {
    if (this._exceptions.length > 0) throw this;
  }

  getPrimordialStatus(): HttpStatus {
    const statuses = this._exceptions.map((exception) => exception.getStatus());
    return Math.max(...statuses);
  }
}
