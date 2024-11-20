import { ExceptionDTO, Meta, Source } from "../dtos/exception.dto";
import { HttpStatus } from "../enums/http_status.enum";

export class Exception extends Error {
  private readonly id: string;
  private readonly status: HttpStatus;
  private readonly code: string;
  private readonly title: string;
  private readonly detail: string;
  private readonly meta?: Meta;
  private readonly source?: Source;
  private readonly timestamp: number;

  constructor(exceptionParam: ExceptionDTO) {
    super(`${exceptionParam.code}: ${exceptionParam.detail}`);
    this.id = exceptionParam.id;
    this.status = exceptionParam.status;
    this.code = exceptionParam.code;
    this.title = exceptionParam.title;
    this.detail = exceptionParam.detail;
    this.meta = exceptionParam.meta;
    this.source = exceptionParam.source;
    this.timestamp = exceptionParam.timestamp;
  }

  public getId(): string {
    return this.id;
  }

  public getStatus(): HttpStatus {
    return this.status;
  }

  public getCode(): string {
    return this.code;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDetail(): string {
    return this.detail;
  }

  public getMeta(): Meta | undefined {
    return this.meta;
  }

  public getSource(): Source | undefined {
    return this.source;
  }

  public getTimestamp(): number {
    return this.timestamp;
  }

  public toJson(): ExceptionDTO {
    return {
      id: this.getId(),
      status: this.getStatus(),
      code: this.getCode(),
      title: this.getTitle(),
      detail: this.getDetail(),
      meta: this.getMeta(),
      source: this.getSource(),
      timestamp: this.getTimestamp(),
    };
  }
}
