interface Exception {
  code: string;
  message: string;
}

export class ExceptionDTO {
  public readonly code: string;
  public readonly message: string;

  constructor(validation: Exception) {
    this.code = validation.code;
    this.message = validation.message;
  }
}
