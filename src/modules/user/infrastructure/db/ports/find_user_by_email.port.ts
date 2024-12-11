import { UserEntity } from "@/user/domain/entities/user.entity";

export interface FindUserByEmailPort {
  findByEmail(email: string): Promise<UserEntity | null>;
}
