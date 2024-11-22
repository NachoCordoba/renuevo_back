import { randomUUID } from "node:crypto";
import { UUID } from "../value_objects/uuid.vo";

type CustomUuidGenerator = () => string;

export class UUIDFactory {
  static create(customUuidGenerator: CustomUuidGenerator = randomUUID): UUID {
    return new UUID(customUuidGenerator());
  }

  static fromPersist(uuid: string) {
    return new UUID(uuid);
  }
}
