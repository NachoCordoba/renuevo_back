import { IHashService } from "@/shared/interfaces/hash_service.interface";

export class Password {
  static MIN_LENGTH_PASSWORD = 8;

  constructor(private _hashedPassword: string) {}

  static hasMinimumLength(
    password: string,
    minLength: number = Password.MIN_LENGTH_PASSWORD
  ): boolean {
    return password.length >= minLength;
  }

  async compare(
    plainPassword: string,
    hashService: IHashService
  ): Promise<boolean> {
    return await hashService.compare(plainPassword, this._hashedPassword);
  }

  get value(): string {
    return this._hashedPassword;
  }
}
