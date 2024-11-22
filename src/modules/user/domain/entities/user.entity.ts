import { Email } from "../value_objects/email.vo";
import { Password } from "../value_objects/password.vo";
import { CreateUserDTO } from "@/user/application/dtos/create_user.dto";
import { EmptyException } from "@/shared/exceptions/empty.exception";
import { MaxLengthException } from "@/shared/exceptions/max_length.exception";
import { AlphabeticException } from "@/shared/exceptions/alphabetic.exception";
import { UUID } from "@/shared/value_objects/uuid.vo";
import { IHashService } from "@/shared/interfaces/hash_service.interface";

export class UserEntity {
  private static MAX_LENGTH_NAME = 50;

  constructor(
    private readonly _id: UUID,
    private readonly _email: Email,
    private readonly _firstName: string,
    private readonly _lastName: string,
    private readonly _password: Password
  ) {}

  static isValidName(name: string, field: string): void {
    if (!name || name.trim().length === 0) {
      throw new EmptyException(name, field);
    }

    if (name.length > 50) {
      throw new MaxLengthException(name, field, this.MAX_LENGTH_NAME);
    }

    if (!/^[a-zA-Z]+$/.test(name)) {
      throw new AlphabeticException(name, field);
    }
  }

  comparePassword(
    plainPassword: string,
    hashService: IHashService
  ): Promise<boolean> {
    return this._password.compare(plainPassword, hashService);
  }

  get id(): string {
    return this._id.value;
  }

  get email(): string {
    return this._email.value;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get password(): string {
    return this._password.value;
  }
}
