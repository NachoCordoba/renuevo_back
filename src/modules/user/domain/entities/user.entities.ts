import { UUID } from "@/shared/value_objects/uuid.vo";

export class UserEntity {
  constructor(
    private _id: UUID,
    private _email: string,
    private _password: string,
    private _firstName: string,
    private _lastName: string
  ) {}

  getId(): string {
    return this._id.getId();
  }

  getEmail(): string {
    return this._email;
  }

  getPassword(): string {
    return this._password;
  }

  getFirstName(): string {
    return this._firstName;
  }

  getLastName(): string {
    return this._lastName;
  }
}
