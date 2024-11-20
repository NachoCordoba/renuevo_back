import { UserDTO } from "@/user/application/dtos/user.dto";

export interface UserRepositoryPort {
  save(user: UserDTO): Promise<UserDTO>;
  findByEmail(email: string): Promise<UserDTO | null>;
}
