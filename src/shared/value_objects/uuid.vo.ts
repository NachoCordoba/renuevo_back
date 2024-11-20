import { randomUUID } from "node:crypto";

type CustomUUIDGenerator = () => string;

export class UUID {
  constructor(private _id: string) {}

  static generate(customUUIDGenerator: CustomUUIDGenerator = randomUUID): UUID {
    return new UUID(customUUIDGenerator());
  }

  getId(): string {
    return this._id;
  }
}
