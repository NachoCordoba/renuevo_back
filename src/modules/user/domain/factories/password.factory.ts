import { IHashService } from "@/shared/interfaces/hash_service.interface";
import { Password } from "../value_objects/password.vo";
import { MinLengthException } from "@/shared/exceptions/min_length.exception";

export class PasswordFactory {
  static async create(
    plainPassword: string,
    hashService: IHashService
  ): Promise<Password> {
    if (!Password.hasMinimumLength(plainPassword))
      throw new MinLengthException(
        "***",
        "password",
        Password.MIN_LENGTH_PASSWORD
      );
    const hashed_password = await hashService.hash(plainPassword);
    return new Password(hashed_password);
  }

  static fromPersist(hashedPassword: string): Password {
    return new Password(hashedPassword);
  }
}
