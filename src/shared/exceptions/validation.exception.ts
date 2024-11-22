import { ValidationDTO } from "../dtos/validation.dto";
import { HttpStatus } from "../enum/http_status.enum";
import { Exception } from "./exception";

export abstract class ValidationException extends Exception {
  public readonly status: HttpStatus = HttpStatus.BAD_REQUEST;
  public readonly property: string;
  public readonly constraint: string;
  public readonly value: string;

  constructor(validationDTO: ValidationDTO) {
    super(validationDTO);
    this.property = validationDTO.property;
    this.constraint = validationDTO.constraint;
    this.value = validationDTO.value;
  }

  toJson() {
    return {
      code: this.code,
      message: this.message,
      property: this.property,
      value: this.value,
    };
  }
}
