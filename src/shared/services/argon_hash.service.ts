import { IHashService } from "../interfaces/hash_service.interface";
import argon from "argon2";

export class ArgonHashService implements IHashService {
  async hash(value: string): Promise<string> {
    return await argon.hash(value);
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return await argon.verify(hashedValue, value);
  }
}
