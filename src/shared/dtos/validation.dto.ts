import { ExceptionDTO } from "./exception.dto";

type Validation = {
  code: string;
  message: string;
  property: string;
  constraint: string;
  value: string;
};

export class ValidationDTO extends ExceptionDTO {
  private readonly _property: string;
  private readonly _constraint: string;
  private readonly _value: string;

  constructor(validation: Validation) {
    super(validation);
    this._property = validation.property;
    this._constraint = validation.constraint;
    this._value = validation.value;
  }

  get property(): string {
    return this._property;
  }

  get constraint(): string {
    return this._constraint;
  }

  get value(): string {
    return this._value;
  }
}
