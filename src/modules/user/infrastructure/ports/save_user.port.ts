import { UserEntity } from "@/user/domain/entities/user.entity";

export interface SaveUserPort {
  save(user: UserEntity): Promise<void>;
}
