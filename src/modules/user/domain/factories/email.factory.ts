import { InvalidEmailFormat } from "../exceptions/invalid_email_format.exception";
import { Email } from "../value_objects/email.vo";

export class EmailFactory {
  static create(email: string): Email {
    if (!Email.isValidEmailFormat(email)) throw new InvalidEmailFormat(email);
    return new Email(email);
  }

  static fromPersist(email: string): Email {
    return new Email(email);
  }
}
