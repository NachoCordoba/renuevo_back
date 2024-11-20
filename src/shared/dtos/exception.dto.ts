import { randomUUID } from "node:crypto";
import { HttpStatus } from "../enums/http_status.enum";

export type Meta = { [key: string]: string | number | Meta };
export type Source = { pointer?: string; parameter?: string; header?: string };

export type ExceptionType = {
  id?: string;
  status: HttpStatus;
  code: string;
  title: string;
  detail: string;
  meta?: Meta;
  source?: Source;
  timestamp?: number;
};

export class ExceptionDTO {
  public readonly id: string;
  public readonly status: HttpStatus;
  public readonly code: string;
  public readonly title: string;
  public readonly detail: string;
  public readonly meta?: Meta;
  public readonly source?: Source;
  public readonly timestamp: number;

  constructor(
    exception: ExceptionType,
    customIdGenerator: () => string = randomUUID
  ) {
    this.id = exception.id || customIdGenerator();
    this.status = exception.status;
    this.code = exception.code;
    this.title = exception.title;
    this.detail = exception.detail;
    this.meta = exception.meta;
    this.source = exception.source;
    this.timestamp = exception.timestamp || Date.now();
  }
}
